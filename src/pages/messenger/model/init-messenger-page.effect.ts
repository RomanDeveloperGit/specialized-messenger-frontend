import { createEffect } from 'effector';

import { connectSocketFx } from '@/shared/api/socket';
import { showDefaultErrorNotificationFx } from '@/shared/lib/show-notification';

import { getConversationsFx } from '@/entities/conversations';

export const initMessengerPageFx = createEffect<void, void>(async () => {
  try {
    await connectSocketFx();
    await getConversationsFx();
  } catch (error) {
    showDefaultErrorNotificationFx({ type: 'somethingWentWrong' });

    throw error;
  }
});
