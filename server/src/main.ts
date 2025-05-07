import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
// import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { I18nValidationPipe } from 'nestjs-i18n';
import { AppModule } from './app.module';
import { EnvironmentVariables } from './config/env/env.schema';
import { CustomI18nValidationExceptionFilter } from './config/errors/Custom-i18n-exception-filter';
import { i18nExceptionFilterOptions } from './config/errors/i18nExceptionFilterOptions';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // ____________ MIDDLEWARES ____________ //
  app.enableCors();
  app.use(helmet());
  app.use(compression());
  // app.use(
  //   rateLimit({
  //     windowMs: 60 * 60 * 1000, // 1 Hour
  //     max: 1000, // limit each IP to 1000 requests per windowMs
  //   }),
  // );

  // ____________ VALIDATION_PIPES ____________ //
  app.useGlobalPipes(
    new I18nValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalFilters(
    new CustomI18nValidationExceptionFilter(i18nExceptionFilterOptions),
  );

  // ____________ START_APP ____________ //
  const configService = app.get(ConfigService<EnvironmentVariables>);
  const globalPrefix = configService.get<string>('API_PREFIX');
  const port = configService.get<number>('APP_PORT');
  const serverDomain = configService.get<string>('SERVER_URL');
  const mode = configService.get<string>('NODE_ENV');
  app.setGlobalPrefix(globalPrefix);

  await app.listen(port, () => {
    Logger.verbose(
      `App run on ${`${serverDomain}/${globalPrefix} in ${mode} mode`}`,
    );
  });
})();
