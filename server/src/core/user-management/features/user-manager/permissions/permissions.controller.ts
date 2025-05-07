import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { IsAuthenticationGuard } from 'src/shared/decorators/is-auth-guard.decorator';
import { LoggedUser } from 'src/shared/decorators/logged-user.decorator';
import { UserModel } from 'src/shared/types/entities/user-management.model';
import { AuthGuard } from '../auth/guards/auth.guard';
import { GetSystemPermissionsDto } from './dto';
import { PermissionsService } from './permissions.service';
import { IsValidParamIdDTO } from 'src/shared/dtos/is-valid-id-param.dto';

@UseGuards(AuthGuard)
@IsAuthenticationGuard()
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  // @DESC: GET All System Permissions
  // @URL: GET => "/permissions/system?origin=PORTAL or ADMINISTRATIVE"
  @Get('/system')
  async getSystemPermissions(@Query() query: GetSystemPermissionsDto) {
    return await this.permissionService.getSystemPermissions(query.origin);
  }

  // @DESC: GET All Logged User Permissions
  // @URL: GET => "/permissions/logged-user"
  @Get('/logged-user')
  async getLoggedUserPermissions(@LoggedUser() user: UserModel) {
    return await this.permissionService.getLoggedUserPermissions(
      user.email,
      user.type,
    );
  }

  // @DESC: GET All Logged User Permissions
  // @URL: GET => "/permissions/logged-user-actions"
  @Get('/logged-user-actions')
  async getLoggedUserActions(@LoggedUser() user: UserModel) {
    return await this.permissionService.getLoggedUserActions(user.email);
  }

  // @DESC: GET All User Permissions By Id
  // @URL: GET => "/permissions/users/actions/:id"
  @Get('/users/actions/:id')
  async getUserActionByUserId(@Param() param: IsValidParamIdDTO) {
    return await this.permissionService.getUserActionByUserId(param.id);
  }

  // @DESC: GET All Roles Permissions By Id
  // @URL: GET => "/permissions/roles/actions/:id"
  @Get('/roles/actions/:id')
  async getRoleActionByRoleId(@Param() param: IsValidParamIdDTO) {
    return await this.permissionService.getRoleActionByRoleId(param.id);
  }
}
