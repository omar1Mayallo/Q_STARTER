import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { JwtService } from 'src/core/user-management/common/modules/jwt/jwt.service';
import { TABLES } from 'src/shared/constants/tables';
import { RepositoryService } from 'src/shared/modules/repository/repository.service';
import { UserModel } from 'src/shared/types/entities/user-management.model';
import { PermissionsService } from '../../permissions/permissions.service';

export interface AuthRequest extends Request {
  user: UserModel;
}

/**
 * Guard responsible for authenticating and authorizing incoming requests.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly permissionsService: PermissionsService,
    private readonly reflector: Reflector,
    private readonly repoService: RepositoryService<UserModel>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthRequest>();

    // 1) Extract Custom MetaData
    const actionName = this.reflector.get<string>(
      'actionName',
      context.getHandler(), // For (method-level)
    );
    const isAuthenticationOnly =
      this.reflector.getAllAndOverride<boolean>('isAuthenticationOnly', [
        context.getHandler(),
        context.getClass(),
      ]) || false;

    // 2) Extract token From Headers "Bearer <JWT>"
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authentication required, please try to login again',
      );
    }
    const token = authHeader.split(' ')[1];

    // 3) Verify token
    let decodedToken;
    try {
      decodedToken = await this.jwtService.verifyToken(token);
    } catch (err) {
      throw new UnauthorizedException(
        'Invalid or expired token, please try to login again',
      );
    }

    // 4) Get logged user
    const loggedUser = await this.repoService.getOne(
      TABLES.USERS,
      {
        id: decodedToken.id,
      },
      { withNotFoundError: false },
    );
    if (!loggedUser) {
      throw new UnauthorizedException(
        'User not found, please try to login again',
      );
    }
    req.user = loggedUser;

    // 5) If isAuthenticationOnly is true, STOP HERE (Authentication Guard)
    if (isAuthenticationOnly) {
      return true;
    }

    // 6) Authorization check
    const isUserHaveAccess = await this.permissionsService.verifyPermissions(
      loggedUser.email,
      actionName,
    );
    if (!isUserHaveAccess) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}
