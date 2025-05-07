import { i18nValidationMessage } from 'nestjs-i18n';
import { IsArrayOfPositiveIntegers } from '../decorators/validations/IsArrayOfPositiveIntegers';
import { I18nTranslations } from 'src/generated/i18n.generated';

export class IsValidArrayIdsDTO {
  @IsArrayOfPositiveIntegers({
    message: i18nValidationMessage<I18nTranslations>(
      'errors.Validation_Errors.ARRAY_POSITIVE',
    ),
  })
  ids: number[];
}
