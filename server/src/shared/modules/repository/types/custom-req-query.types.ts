import * as core from 'express-serve-static-core';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export interface CustomReqQuery extends core.Query {
  limit?: number;
  page?: number;
  fields?: string;
  sort?: string;
  search?: string;
  // Add other query parameters specific to your application
  // For example, id[gt], id[lt], deleted_at, etc.
  [key: string]: any;
}

export class CustomReqQueryDTO implements CustomReqQuery {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  page?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value))
  limit?: number;

  @IsOptional()
  @IsString()
  fields?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @IsOptional()
  @IsString()
  search?: string;
}
