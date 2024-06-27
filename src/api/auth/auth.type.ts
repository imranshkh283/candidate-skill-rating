import { user } from '@prisma/client';

export type CurrentUserToken = {
  token: string;
} & CurrentUser;

export type CurrentUser = Pick<user, 'id' | 'name' | 'role'>;

export const USER_SELECT_FIELDS = {
  id: true,
  name: true,
  email: true,
  role: true,
};
