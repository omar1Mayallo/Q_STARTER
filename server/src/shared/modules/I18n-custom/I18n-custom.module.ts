import { Global, Module } from '@nestjs/common';
import { I18nModule } from 'nestjs-i18n';
import { I18NConfigsOptions } from './I18n-custom.config';
import { I18nCustomService } from './I18n-custom.service';

@Global()
@Module({
  imports: [I18nModule.forRootAsync(I18NConfigsOptions)],
  providers: [I18nCustomService],
  exports: [I18nCustomService],
})
export class I18nCustomModule {}
