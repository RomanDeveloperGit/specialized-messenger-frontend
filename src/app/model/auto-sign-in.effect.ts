import { sample } from 'effector';

import { baseSignInEffectsFactory } from '@/entities/auth/model';

export const {
  baseSignInFx: autoSignInFx,
  baseSignInDoneFx: autoSignInDoneFx,
} = baseSignInEffectsFactory();

sample({
  clock: autoSignInFx.doneData,
  target: autoSignInDoneFx,
});
