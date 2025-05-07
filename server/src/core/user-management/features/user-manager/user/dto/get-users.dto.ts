import { IsOptional } from 'class-validator';
import { CustomReqQueryDTO } from 'src/shared/modules/repository/types/custom-req-query.types';

export class GetAllUsersDTO extends CustomReqQueryDTO {
  @IsOptional()
  id: string;

  @IsOptional()
  deleted_at: string;

  @IsOptional()
  status: string;

  @IsOptional()
  type: string;
}
