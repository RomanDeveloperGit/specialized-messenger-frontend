import { createEffect, createEvent, sample, type StoreValue } from 'effector';

import { joinConversation, leaveConversation } from '@/shared/api/socket';

import {
  $activeConversationPublicId,
  activeConversationApi,
} from '@/entities/active-conversation/model/active-conversation.store';
import { getConversationFx } from '@/entities/active-conversation/model/get-conversation.effect';
import { $conversations } from '@/entities/conversations/model/conversations.store';

type OpenConversationFxParams = {
  publicId: string;
  conversations: StoreValue<typeof $conversations>;
};

// Для отмены предыдущего неотвеченного запроса
let abortController = new AbortController();

export const openConversation =
  createEvent<Pick<OpenConversationFxParams, 'publicId'>>();

const openConversationFx = createEffect<OpenConversationFxParams, void>(
  async ({ publicId, conversations }) => {
    abortController.abort();
    abortController = new AbortController();

    const preloadConversation = conversations.find(
      (conversation) => conversation.publicId === publicId,
    );

    if (preloadConversation) {
      activeConversationApi.set(preloadConversation);
    }

    await new Promise<void>((resolve) => {
      leaveConversation({
        ack: () => {
          resolve();
        },
        data: undefined,
      });
    });

    await new Promise<void>((resolve) => {
      joinConversation({
        ack: () => {
          resolve();
        },
        data: { conversationId: publicId },
      });
    });

    await getConversationFx({ publicId, abortController });
  },
);

sample({
  clock: openConversation,
  source: {
    activeConversationPublicId: $activeConversationPublicId,
    conversations: $conversations,
  },
  filter: (source, clock) =>
    clock.publicId !== source.activeConversationPublicId,
  fn: (source, clock) => ({
    publicId: clock.publicId,
    conversations: source.conversations,
  }),
  target: openConversationFx,
});
