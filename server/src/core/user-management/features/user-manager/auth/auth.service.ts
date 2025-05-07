import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BcryptService } from 'src/core/user-management/common/modules/bcrypt/bcrypt.service';
import { JwtService } from 'src/core/user-management/common/modules/jwt/jwt.service';
import { TABLES } from 'src/shared/constants/tables';
import { I18nCustomService } from 'src/shared/modules/I18n-custom/I18n-custom.service';
import { RepositoryService } from 'src/shared/modules/repository/repository.service';
import { UserModel } from 'src/shared/types/entities/user-management.model';
import { LoginUserDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly repoService: RepositoryService<UserModel>,
    private readonly i18nService: I18nCustomService,
  ) {}

  // async register(body: CreateUserDTO) {
  //   // 1) Create User
  //   const user = await this.userService.createUser(body);

  //   // 2) Generate Token
  //   const token = await this.generateToken(`${user.id}`);

  //   delete user.password;

  //   return { user, token };
  // }

  async login(body: LoginUserDTO) {
    // 1) Check If User is Exist and Password Is Correct
    const user = await this.repoService.getOne(
      TABLES.USERS,
      {
        email: body.email,
      },
      { withNotFoundError: false },
    );
    if (
      !user ||
      !(await this.bcryptService.compare(body.password, user.password))
    ) {
      throw new BadRequestException(
        this.i18nService.t('errors.Http_Errors.INVALID_CREDENTIALS'),
      );
    }

    // 2) Generate Token
    const token = await this.generateToken(`${user.id}`);

    delete user.password;

    return { user, token };
  }

  //_________________|PRIVATE|_________________//
  private async generateToken(id: string): Promise<string> {
    return this.jwtService.signToken(
      { id },
      this.configService.get<string>('JWT_SECRET'),
      this.configService.get<string>('JWT_EXPIRATION_DATE'),
    );
  }
}
