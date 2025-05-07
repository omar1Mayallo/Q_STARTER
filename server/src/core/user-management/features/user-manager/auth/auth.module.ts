import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/core/user-management/common/modules/bcrypt/bcrypt.module';
import { JwtModule } from 'src/core/user-management/common/modules/jwt/jwt.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, JwtModule, BcryptModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
