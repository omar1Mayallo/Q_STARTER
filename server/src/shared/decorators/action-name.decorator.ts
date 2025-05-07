import { SetMetadata } from '@nestjs/common';

/**
 * Decorator to set metadata for action name.
 * @param action The action name or an array of action names.
 * @returns {Function} The SetMetadata decorator function.
 */
export const ActionName = (action: string | string[]) =>
  SetMetadata('actionName', action);
