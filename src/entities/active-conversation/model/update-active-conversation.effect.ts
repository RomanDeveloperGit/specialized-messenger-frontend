import { createEffect, sample } from 'effector';

import { activeConversationUpdate } from '@/shared/api/socket';

import { $activeConversationPublicId } from './active-conversation.store';
import { getConversationFx } from './get-conversation.effect';

type UpdateActiveConversationFxParams = {
  conversationPublicId: string;
};

const updateActiveConversationFx = createEffect<
  UpdateActiveConversationFxParams,
  void
>(({ conversationPublicId }) => {
  getConversationFx({ publicId: conversationPublicId });
});

sample({
  clock: activeConversationUpdate,
  source: $activeConversationPublicId,
  fn: (source) => ({ conversationPublicId: source! }),
  target: updateActiveConversationFx,
});
