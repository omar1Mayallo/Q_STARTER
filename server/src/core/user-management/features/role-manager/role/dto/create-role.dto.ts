import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { STATUS, USER_TYPE } from 'src/shared/types/enums';

export class CreateRoleDTO {
  @MaxLength(100, { message: 'Name cannot exceed 100 characters' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @MaxLength(255, { message: 'Description cannot exceed 255 characters' })
  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(USER_TYPE)
  @IsOptional()
  type?: USER_TYPE;

  @IsEnum(STATUS)
  @IsOptional()
  status?: STATUS;
}
