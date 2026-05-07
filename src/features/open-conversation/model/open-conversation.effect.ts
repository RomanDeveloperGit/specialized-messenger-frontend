import { createEffect, createEvent, sample, type StoreValue } from 'effector';

import { joinConversation, leaveConversation } from '@/shared/api/socket';

import {
  $activeConversationPublicId,
  $hasActiveConversation,
  activeConversationApi,
} from '@/entities/active-conversation/model/active-conversation.store';
import { getConversationFx } from '@/entities/active-conversation/model/get-conversation.effect';
import { $conversations } from '@/entities/conversations/model/conversations.store';

type OpenConversationFxParams = {
  publicId: string;
  conversations: StoreValue<typeof $conversations>;
  hasActiveConversation: boolean;
};

// Для отмены предыдущего неотвеченного запроса
let abortController = new AbortController();

export const openConversation =
  createEvent<Pick<OpenConversationFxParams, 'publicId'>>();

const openConversationFx = createEffect<OpenConversationFxParams, void>(
  async ({ publicId, conversations, hasActiveConversation }) => {
    abortController.abort();
    abortController = new AbortController();

    const preloadConversation = conversations.find(
      (conversation) => conversation.publicId === publicId,
    );

    if (preloadConversation) {
      activeConversationApi.set(preloadConversation);
    }

    if (hasActiveConversation) {
      leaveConversation({ data: undefined });
    }

    joinConversation({ data: { conversationId: publicId } });

    await getConversationFx({ publicId, abortController });
  },
);

sample({
  clock: openConversation,
  source: {
    activeConversationPublicId: $activeConversationPublicId,
    conversations: $conversations,
    hasActiveConversation: $hasActiveConversation,
  },
  filter: (source, clock) =>
    clock.publicId !== source.activeConversationPublicId,
  fn: (source, clock) => ({
    publicId: clock.publicId,
    conversations: source.conversations,
    hasActiveConversation: source.hasActiveConversation,
  }),
  target: openConversationFx,
});
