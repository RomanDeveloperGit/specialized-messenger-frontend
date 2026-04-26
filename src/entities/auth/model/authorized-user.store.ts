import { restore } from 'effector';

import { baseSignInFx } from './base-sign-in.effect';

export const $authorizedUser = restore(baseSignInFx.doneData, null).map(
  (data) => data?.user || null,
);
export const $authorizedUserId = $authorizedUser.map(
  (user) => user?.id || null,
);
export const $isAuthorized = $authorizedUser.map(Boolean);
export const $isAdmin = $authorizedUser.map(
  (user) => user?.role.name === 'ADMIN',
);
