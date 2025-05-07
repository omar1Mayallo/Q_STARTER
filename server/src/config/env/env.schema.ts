import { IsEnum, IsInt, IsString, IsUrl } from 'class-validator';
import { IEnvironmentVariables } from './env.interface';

export enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
}

export class EnvironmentVariables implements IEnvironmentVariables {
  // #APP
  @IsEnum(Environment)
  NODE_ENV: Environment = Environment.Development;
  @IsInt()
  APP_PORT: number = 3000;
  @IsString()
  API_PREFIX: string = 'api';
  @IsUrl({
    /*
    TLD stands for "Top-Level Domain." It's the last segment of a domain name, Common TLDs include .com, .org, .net, .edu, .gov ,, For instance, in the URL "www.example.com":
    "www" is the subdomain.
    "example" is the domain name.
    ".com" is the top-level domain.
    */
    require_tld: false,
  })
  SERVER_URL: string = 'http://localhost:3000';
  @IsString()
  FALLBACK_LANGUAGE: string = 'en';

  // #DATABASE
  @IsString()
  DB_HOST: string = 'localhost';
  @IsInt()
  DB_PORT: number = 5432;
  @IsString()
  DB_USER: string = 'postgres';
  @IsString()
  DB_PASSWORD: string = 'password';
  @IsString()
  DB_DATABASE: string = 'db_name';

  // #JWT
  @IsString()
  JWT_SECRET: string = 'your-jwt-secret';
  @IsString()
  JWT_EXPIRATION_DATE: string = '1d';
}
