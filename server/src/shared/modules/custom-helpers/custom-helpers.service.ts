import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomHelpersService {
  /**
   * Checks if a value is of a specified type.
   *
   * @param type The type to check against (e.g., String, Number).
   * @param val The value to check.
   * @returns true if val is of type type, false otherwise.
   *
   * Example:
   *  is(String, 'hello') // true
   *  is(Number, 123)     // true
   *  is(Array, [1, 2, 3]) // true
   *  is(Object, {})     // true
   */
  is(type: any, val: any): boolean {
    if (type.prototype instanceof Object) {
      return val instanceof type;
    } else {
      return typeof val === type;
    }
  }

  /**
   * Checks if a value is empty. For objects and arrays, "empty" means having no elements.
   * For strings, it means being an empty string. For null or undefined, it also returns true.
   *
   * @param val The value to check.
   * @returns true if val is empty, false otherwise.
   *
   * Example:
   *  isEmpty({})           // true
   *
   *  isEmpty([])           // true
   *
   *  isEmpty('')           // true
   *
   *  isEmpty(null)         // true
   *
   *  isEmpty(undefined)    // true
   *
   *  isEmpty('text')       // false
   *
   *  isEmpty([1, 2, 3])    // false
   *
   *  isEmpty({ key: 'value' }) // false
   */
  isEmpty(val: any): boolean {
    return (
      val == null ||
      (typeof val === 'object' && Object.keys(val).length === 0) ||
      (Array.isArray(val) && val.length === 0) ||
      (typeof val === 'string' && val.length === 0)
    );
  }

  /**
   * Checks if a value is null or undefined.
   *
   * @param val The value to check.
   * @returns true if val is null or undefined, false otherwise.
   *
   * Example:
   *  isNil(null)      // true
   *  isNil(undefined) // true
   *  isNil('')        // false
   *  isNil(0)         // false
   *  isNil(false)     // false
   */
  isNil(val: any): boolean {
    return val == null;
  }
}
