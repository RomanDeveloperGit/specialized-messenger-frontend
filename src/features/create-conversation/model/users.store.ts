import { combine, createApi, createStore } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { $authorizedUser } from '@/entities/auth/model';

type Controller = OperationInfo<'UserController_getAll_v1'>;
type Response = Controller['response'];

export const $rawUsers = createStore<Response>([]);
export const $users = combine(
  $rawUsers,
  $authorizedUser,
  (users, authorizedUser) =>
    users.filter((user) => user.id !== authorizedUser?.id),
);
export const usersApi = createApi($rawUsers, {
  set: (_, users: Response) => users,
  reset: () => [],
});

export const $hasUsersError = createStore(false);
export const hasUsersErrorApi = createApi($hasUsersError, {
  init: () => true,
  reset: () => false,
});
