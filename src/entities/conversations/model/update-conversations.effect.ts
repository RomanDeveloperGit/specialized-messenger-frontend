import { createEffect, sample } from 'effector';

import { updateConversations } from '@/shared/api/socket';

import { getConversationsFx } from './get-conversations.effect';

const updateConversationsFx = createEffect<void, void>(() => {
  getConversationsFx();
});

sample({
  clock: updateConversations,
  target: updateConversationsFx,
});
