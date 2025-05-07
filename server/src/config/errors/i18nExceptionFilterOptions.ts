import { ArgumentsHost, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import {
  I18nValidationException,
  I18nValidationExceptionFilterDetailedErrorsOption,
  I18nValidationExceptionFilterErrorFormatterOption,
} from 'nestjs-i18n';

/**
 * Formats validation errors to include ONLY the first constraint message.
 *
 * @param errors Array of ValidationError objects.
 * @returns Array of objects with `field` and `message` for each error.
 */
const errorFormatter = (errors: ValidationError[]): object => {
  return errors.map((error) => {
    const firstConstraintKey = Object.keys(error.constraints)[0];
    const firstConstraintMessage = error.constraints[firstConstraintKey];
    return {
      field: error.property,
      message: firstConstraintMessage,
    };
  });
};

/**
 * Formats the response body for validation exceptions.
 *
 * @param host The arguments host.
 * @param exc The I18n validation exception.
 * @param formattedErrors The formatted errors after applying the errorFormatter.
 * @returns An object representing the formatted response body.
 */
const responseBodyFormatter = (
  host: ArgumentsHost,
  exc: I18nValidationException,
  formattedErrors: ValidationError[],
): Record<string, unknown> => {
  return {
    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    error: 'ValidationException',
    errors: formattedErrors,
  };
};

/**
 * i18nExceptionFilterOptions for I18nValidationExceptionFilter, integrating both
 * detailed error information and custom error formatting.
 */
export const i18nExceptionFilterOptions: I18nValidationExceptionFilterErrorFormatterOption &
  I18nValidationExceptionFilterDetailedErrorsOption = {
  errorFormatter,
  responseBodyFormatter,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
};
