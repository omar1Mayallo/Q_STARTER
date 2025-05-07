// src/permissions/dto/get-system-permissions.dto.ts
import { IsString, IsIn } from 'class-validator';
import { USER_TYPE } from 'src/shared/types/enums';

export class GetSystemPermissionsDto {
  @IsString()
  @IsIn(Object.values(USER_TYPE))
  origin: USER_TYPE;
}
