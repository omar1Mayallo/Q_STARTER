import { IsArray, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';

export class AssignPermissionsDTO {
  @IsArray({
    message: i18nValidationMessage<I18nTranslations>(
      'errors.Validation_Errors.ARRAY_MUST_BE_ARRAY',
    ),
  })
  @IsString({
    each: true,
    message: i18nValidationMessage<I18nTranslations>(
      'errors.Validation_Errors.ARRAY_STRING',
    ),
  })
  actions: string[] = [];
}
