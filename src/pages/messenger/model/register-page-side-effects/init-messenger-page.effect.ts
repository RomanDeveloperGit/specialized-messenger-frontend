import { createEffect } from 'effector';

import { showDefaultErrorNotificationFx } from '@/shared/lib/show-notification';

import { getConversationsFx } from '../conversations/get-conversations.effect';
import { connectSocketFx } from '../socket/connect-socket.effect';
import { isMessengerPagePendingApi } from './is-messenger-page-pending.store';

export const initMessengerPageFx = createEffect<void, void>(async () => {
  try {
    isMessengerPagePendingApi.set(true);

    await connectSocketFx();
    await getConversationsFx();
  } catch (error) {
    showDefaultErrorNotificationFx({ type: 'somethingWentWrong' });

    throw error;
  } finally {
    isMessengerPagePendingApi.reset();
  }
});
