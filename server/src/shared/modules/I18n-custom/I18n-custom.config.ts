import { ConfigService } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nAsyncOptions,
  QueryResolver,
} from 'nestjs-i18n';

export const I18NConfigsOptions: I18nAsyncOptions = {
  useFactory: (configService: ConfigService) => ({
    fallbackLanguage: configService.get<string>('FALLBACK_LANGUAGE'),
    loaderOptions: {
      path: 'src/i18n',
      watch: true,
      includeSubfolders: true,
    },
    typesOutputPath: 'src/generated/i18n.generated.ts',
  }),
  resolvers: [
    { use: QueryResolver, options: ['lang'] },
    AcceptLanguageResolver,
    new HeaderResolver(['x-lang']),
  ],
  inject: [ConfigService],
};
