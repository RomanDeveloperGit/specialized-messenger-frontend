import { createEffect, sample } from 'effector';

import { conversationsUpdate } from '@/shared/api/socket';

import { getConversationsFx } from './get-conversations.effect';

const updateConversationsFx = createEffect<void, void>(() => {
  getConversationsFx();
});

sample({
  clock: conversationsUpdate,
  target: updateConversationsFx,
});
