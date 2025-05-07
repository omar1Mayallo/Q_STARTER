/**
 * `ValueOf<T>`: A utility type that extracts the value types of a given object type `T`.
 *
 * This type takes an object type `T` as its generic parameter and returns a union type
 * representing all the possible values that the object's properties can have.
 *
 * How it works:
 * - `T[keyof T]`: `keyof T` creates a union type of all the keys of the object `T`.
 *   Then, `T[keyof T]` accesses the types of the values corresponding to these keys,
 *   effectively creating a union type of all the value types in the object.
 *
 * Example Usage:
 * - Suppose you have an object `const OBJ = { a: 'hello', b: 123 } as const;`
 * - `ValueOf<typeof OBJ>` will be the type `'hello' | 123`.
 */
export type ValueOf<T> = T[keyof T];
