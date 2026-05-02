import { createEffect } from 'effector';

import { showDefaultErrorNotificationFx } from '@/shared/lib/show-notification';

import { getConversationsFx } from '../../modules/conversations/model/get-conversations.effect';
import { connectSocketFx } from '../socket/connect-socket.effect';

export const initMessengerPageFx = createEffect<void, void>(async () => {
  try {
    await connectSocketFx();
    await getConversationsFx();
  } catch (error) {
    showDefaultErrorNotificationFx({ type: 'somethingWentWrong' });

    throw error;
  }
});
