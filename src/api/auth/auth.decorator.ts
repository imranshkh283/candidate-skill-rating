import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CurrentUser } from './auth.type';

export const getCurrentUser = createParamDecorator(
  (data: keyof CurrentUser, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user?.[data] : request.user;
  },
);
