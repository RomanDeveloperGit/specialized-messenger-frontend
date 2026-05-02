import { createEffect } from 'effector';

import { getConversationsFx } from '../../../modules/conversations/model/get-conversations.effect';

export const updateConversationsFx = createEffect<void, void>(() => {
  getConversationsFx();
});
