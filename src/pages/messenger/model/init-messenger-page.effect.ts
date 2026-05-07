import { createEffect, createEvent, sample, type StoreValue } from 'effector';

import { connectSocketFx } from '@/shared/api/socket';
import { showDefaultErrorNotificationFx } from '@/shared/lib/show-notification';

import { $authorizedUser } from '@/entities/auth';
import { getConversationsFx } from '@/entities/conversations';
import { getUsersFx } from '@/entities/users';

type InitMessengerPageFxParams = {
  authorizedUser: NonNullable<StoreValue<typeof $authorizedUser>>;
};

export const initMessengerPage = createEvent();

export const initMessengerPageFx = createEffect<
  InitMessengerPageFxParams,
  void
>(async ({ authorizedUser }) => {
  try {
    await connectSocketFx();

    await getConversationsFx();

    if (authorizedUser.role.name === 'ADMIN') {
      await getUsersFx({ excludeUserId: authorizedUser.id });
    }
  } catch (error) {
    showDefaultErrorNotificationFx({ type: 'somethingWentWrong' });

    throw error;
  }
});

sample({
  clock: initMessengerPage,
  source: $authorizedUser,
  fn: (source) => ({ authorizedUser: source! }),
  target: initMessengerPageFx,
});
