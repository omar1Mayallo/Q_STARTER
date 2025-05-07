import { Injectable } from '@nestjs/common';
import { PathImpl2 } from '@nestjs/config';
import { I18nContext, I18nService, TranslateOptions } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

/**
 * This Custom Service Used For Don't reuse {lang: I18nContext.current().lang} for every message_key
 */
@Injectable()
export class I18nCustomService {
  constructor(private readonly i18n: I18nService<I18nTranslations>) {}

  t(
    message_key: PathImpl2<I18nTranslations>,
    options?: Omit<TranslateOptions, 'lang'>,
  ) {
    const lang: string = I18nContext.current().lang;
    return this.i18n.t(message_key, { lang, ...options });
  }
}
