import { combine, createEffect, restore, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedApi } from '@/shared/api';
import { showErrorNotificationFx } from '@/shared/lib/show-notification';

import { $authorizedUser } from '@/entities/auth/model';

type Controller = OperationInfo<'UserController_getAll_v1'>;
type Path = Controller['path'];
type Response = Controller['response'];

export const getUsersFx = createEffect<void, Response>(async () => {
  return await authorizedApi
    .get<Response>(`/api/v1/users` satisfies Path)
    .json();
});

sample({
  clock: getUsersFx.fail,
  fn: () => ({ message: 'Get users error' }),
  target: showErrorNotificationFx,
});

const $rawUsers = restore(getUsersFx.doneData, []);
export const $users = combine(
  $rawUsers,
  $authorizedUser,
  (users, authorizedUser) =>
    users.filter((user) => user.id !== authorizedUser?.id),
);
