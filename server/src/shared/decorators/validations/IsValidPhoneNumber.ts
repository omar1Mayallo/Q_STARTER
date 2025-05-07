import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

@ValidatorConstraint({ async: false })
export class IsValidPhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any, _: ValidationArguments) {
    try {
      // Attempt to parse the phone number
      const phoneNumber = parsePhoneNumber(value);

      // Extract country code from the parsed phone number
      const country = phoneNumber?.country;

      // Check if the parsed number is valid for the extracted country code
      return country && isValidPhoneNumber(phoneNumber.number, country);
    } catch (error) {
      return false;
    }
  }

  defaultMessage(_: ValidationArguments) {
    return 'The value must be a valid phone number';
  }
}

/**
 * Custom decorator function to validate if a property value is a valid phone number.
 * @param validationOptions Optional validation options.
 */
export function IsValidPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPhoneNumberConstraint,
    });
  };
}
