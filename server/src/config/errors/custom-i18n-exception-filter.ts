import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  I18nValidationException,
  I18nValidationExceptionFilter,
  I18nValidationExceptionFilterDetailedErrorsOption,
  I18nValidationExceptionFilterErrorFormatterOption,
} from 'nestjs-i18n';
import { UNIQUE_VIOLATION_REGEX } from 'src/shared/constants/regexs';
import { isDatabaseError } from 'src/shared/types/errors/database-errors';

/**
 * Custom exception filter that extends the base I18nValidationExceptionFilter.
 * This filter handles various types of exceptions, specifically focusing on
 * internationalized validation errors, standard HTTP exceptions ...etc .
 * It also provides a default case for unhandled exceptions.
 */
@Catch()
export class CustomI18nValidationExceptionFilter extends I18nValidationExceptionFilter {
  constructor(
    options?:
      | I18nValidationExceptionFilterDetailedErrorsOption
      | I18nValidationExceptionFilterErrorFormatterOption,
  ) {
    super(options);
  }

  catch(exception: unknown, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    console.log(exception);

    // [1] I18N VALIDATION ERRORS
    if (exception instanceof I18nValidationException) {
      Logger.error('I18N_VALIDATION_ERRORS', exception);
      return super.catch(exception, host);
    }

    // [2] HTTP ERRORS
    else if (exception instanceof HttpException) {
      Logger.error('HTTP_ERRORS', exception);
      const status = exception.getStatus();
      return response.status(status).json({
        statusCode: status,
        error: exception.name,
        message: exception.message,
      });
    }

    // [3] DATABASE ERRORS
    else if (isDatabaseError(exception)) {
      // References Of PostgreSQL Error Codes >> https://www.postgresql.org/docs/current/errcodes-appendix.html
      Logger.error('DATABASE_ERROR', exception);
      const error = 'DatabaseException';

      // @unique_violation
      if (exception.code === '23505') {
        const detailedMessage = exception.detail.match(UNIQUE_VIOLATION_REGEX);
        // const field = detailedMessage[1];
        const value = detailedMessage[2];
        // const formattedMessage = `This ${field} ${value} already exist`;
        const formattedMessage = `${value} already exist`;

        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          error,
          message: formattedMessage,
        });
      }

      // @DEFAULT Database Error
      else {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          error,
          message: exception.message,
        });
      }
    }

    // [3] UNHANDLED_ERRORS
    Logger.error('UNHANDLED_ERRORS', exception);
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'Something went wrong',
    });
  }
}
