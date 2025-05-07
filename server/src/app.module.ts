import { PermissionsModule } from './core/user-management/features/user-manager/permissions/permissions.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfigOptions } from './config/env/env.config';
import { DatabaseModule } from './database/database.module';
import { I18nCustomModule } from './shared/modules/I18n-custom/I18n-custom.module';
import { CustomHelpersModule } from './shared/modules/custom-helpers/custom-helpers.module';
import { UserModule } from './core/user-management/features/user-manager/user/user.module';
import { AuthModule } from './core/user-management/features/user-manager/auth/auth.module';
import { RoleModule } from './core/user-management/features/role-manager/role/role.module';
import { GroupModule } from './core/user-management/features/group-manager/group/group.module';
import { RepositoryModule } from './shared/modules/repository/repository.module';

@Module({
  imports: [
    PermissionsModule,
    // ______ BASE_CONFIGURATIONS_MODULES ______ //
    ConfigModule.forRoot(ConfigOptions),
    DatabaseModule,
    I18nCustomModule,
    CustomHelpersModule,
    RepositoryModule,
    // ______ CORE_MODULES ______ //
    UserModule,
    AuthModule,
    RoleModule,
    GroupModule,
  ],
})
export class AppModule {}
