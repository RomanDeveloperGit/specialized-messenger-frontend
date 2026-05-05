import { createApi, createStore } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

type Controller = OperationInfo<'UserController_getAll_v1'>;
type Response = Controller['response'];

export const $users = createStore<Response>([]);
export const usersApi = createApi($users, {
  set: (_, users: Response) => users,
  reset: () => [],
});

export const $hasUsersError = createStore(false);
export const hasUsersErrorApi = createApi($hasUsersError, {
  init: () => true,
  reset: () => false,
});
