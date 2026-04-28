import { sample } from 'effector';

import { signInEffectsFactory } from '@/entities/auth/model';

const { signInFx, signInSuccessFx } = signInEffectsFactory();

export const autoSignInFx = signInFx;

sample({
  clock: autoSignInFx.doneData,
  target: signInSuccessFx,
});
