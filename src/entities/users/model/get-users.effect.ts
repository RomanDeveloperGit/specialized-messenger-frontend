import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api/http';

import { hasUsersErrorApi, usersApi } from './users.store';

type Controller = OperationInfo<'UserController_getAll_v1'>;
type Path = Controller['path'];
type Response = Controller['response'];

type GetUsersFxParams = {
  excludeUserId?: string;
};

type getUsersFxResult = {
  users: Response;
};

export const getUsersFx = createEffect<GetUsersFxParams, getUsersFxResult>(
  async ({ excludeUserId }) => {
    try {
      hasUsersErrorApi.reset();

      const rawUsers = await authorizedHttpClient
        .get<Response>(`/api/v1/users` satisfies Path)
        .json();
      const users = rawUsers.filter((user) => user.id !== excludeUserId);

      usersApi.set(users);

      return { users };
    } catch (error) {
      hasUsersErrorApi.init();

      throw error;
    }
  },
);
