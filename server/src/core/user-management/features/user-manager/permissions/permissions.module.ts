import { Global, Module } from '@nestjs/common';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../../role-manager/role/role.module';

@Global()
@Module({
  imports: [UserModule, RoleModule],
  controllers: [PermissionsController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
