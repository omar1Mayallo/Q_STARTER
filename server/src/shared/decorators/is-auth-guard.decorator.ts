import { SetMetadata } from '@nestjs/common';

/**
 * Decorator function for setting metadata indicating whether the route guard is for authentication only.
 * @param isAuthenticationOnly Specifies if the guard is for authentication only. Defaults to true.
 * @returns A function that sets metadata for the route guard.
 */
export const IsAuthenticationGuard = (isAuthenticationOnly: boolean = true) =>
  SetMetadata('isAuthenticationOnly', isAuthenticationOnly);
