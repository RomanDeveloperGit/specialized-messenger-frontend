import { createEffect } from 'effector';

import { getConversationsFx } from '../../conversations/get-conversations.effect';

export const updateConversationsFx = createEffect<void, void>(() => {
  getConversationsFx();
});
