import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/generated/i18n.generated';
import { PASSWORD_REGEX } from 'src/shared/constants/regexs';

export class LoginUserDTO {
  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'errors.Validation_Errors.REQUIRED',
    ),
  })
  @IsEmail(
    {},
    {
      message: i18nValidationMessage<I18nTranslations>(
        'errors.Validation_Errors.INVALID_EMAIL',
      ),
    },
  )
  email: string;

  @IsNotEmpty({
    message: i18nValidationMessage<I18nTranslations>(
      'errors.Validation_Errors.REQUIRED',
    ),
  })
  @Matches(PASSWORD_REGEX, {
    message: i18nValidationMessage<I18nTranslations>(
      'errors.Validation_Errors.PASSWORD_REGEX',
    ),
  })
  password: string;
}
