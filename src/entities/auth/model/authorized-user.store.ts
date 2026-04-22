import { restore } from 'effector';

import { baseSignInFx } from './base-sign-in.effect';

export const $authorizedUser = restore(baseSignInFx.doneData, null).map(
  (data) => data?.user || null,
);
export const $isAuthorized = $authorizedUser.map(Boolean);
