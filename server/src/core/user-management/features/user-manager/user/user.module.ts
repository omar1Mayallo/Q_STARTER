import { Module } from '@nestjs/common';
import { BcryptModule } from 'src/core/user-management/common/modules/bcrypt/bcrypt.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [BcryptModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
