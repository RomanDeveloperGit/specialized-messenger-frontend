import { createEffect, sample } from 'effector';

import { conversationsRemove } from '@/shared/api/socket';

import { conversationsApi } from './conversations.store';

type RemoveConversationFxParams = {
  conversationPublicId: string;
};

const removeConversationFx = createEffect<RemoveConversationFxParams, void>(
  ({ conversationPublicId }) => {
    conversationsApi.remove(conversationPublicId);
  },
);

sample({
  clock: conversationsRemove,
  fn: (clock) => ({ conversationPublicId: clock.conversationId }),
  target: removeConversationFx,
});
