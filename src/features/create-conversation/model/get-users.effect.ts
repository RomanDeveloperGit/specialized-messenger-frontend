import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api/http';

import { hasUsersErrorApi, usersApi } from './users.store';

type Controller = OperationInfo<'UserController_getAll_v1'>;
type Path = Controller['path'];
type Response = Controller['response'];

type getUsersFxResult = {
  users: Response;
};

export const getUsersFx = createEffect<void, getUsersFxResult>(async () => {
  try {
    hasUsersErrorApi.reset();

    const users = await authorizedHttpClient
      .get<Response>(`/api/v1/users` satisfies Path)
      .json();

    usersApi.set(users);

    return { users };
  } catch (error) {
    hasUsersErrorApi.init();

    throw error;
  }
});
