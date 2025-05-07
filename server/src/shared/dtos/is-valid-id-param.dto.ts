import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class IsValidParamIdDTO {
  @Min(1)
  @IsInt()
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  id: number;
}
