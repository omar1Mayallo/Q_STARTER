import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator function for extracting the logged-in user from the request.
 */
export const LoggedUser = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
