import { createEffect, sample } from 'effector';

import { conversationsRemove } from '@/shared/api/socket';

import { activeConversationApi } from './active-conversation.store';

const resetActiveConversationOnRemoveFx = createEffect<void, void>(() => {
  activeConversationApi.reset();
});

sample({
  clock: conversationsRemove,
  target: resetActiveConversationOnRemoveFx,
});
