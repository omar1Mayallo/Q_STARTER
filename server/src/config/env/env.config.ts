import { ConfigModuleOptions } from '@nestjs/config';
import { validate } from './env.validate';

export const ConfigOptions: ConfigModuleOptions = {
  isGlobal: true,
  validate,
};
