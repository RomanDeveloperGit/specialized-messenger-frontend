import { createApi, createStore } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

type Controller = OperationInfo<'AuthController_signIn_v1'>;
type Response = Controller['response'];

export const $authorizedUser = createStore<Response | null>(null);
export const $authorizedUserId = $authorizedUser.map(
  (user) => user?.id || null,
);
export const $isAuthorized = $authorizedUser.map(Boolean);
export const $isAdmin = $authorizedUser.map(
  (user) => user?.role.name === 'ADMIN',
);

export const authorizedUserApi = createApi($authorizedUser, {
  set: (_, user: Response) => user,
});
