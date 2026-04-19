import { createEvent, createStore } from 'effector';

import { type OperationInfo } from '@specialized-messenger/api/specs';

type User = OperationInfo<'AuthController_signIn_v1'>['response'];

export const $authorizedUser = createStore<User | null>(null);
export const $isAuthorized = $authorizedUser.map(Boolean);

export const setAuthorizedUser = createEvent<User | null>();

$authorizedUser.on(setAuthorizedUser, (_, payload) => payload);
