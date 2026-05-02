import { createEffect, createEvent, sample, type StoreValue } from 'effector';

import { $conversations } from '../conversations/conversations.store';
import { joinConversationFx } from '../socket/emit-events/join-conversation.effect';
import { leaveConversationFx } from '../socket/emit-events/leave-conversation.effect';
import { $socket, type Socket } from '../socket/socket.store';
import {
  $activeConversationPublicId,
  activeConversationApi,
} from './active-conversation.store';
import { getConversationFx } from './get-conversation.effect';

type OpenConversationFxParams = {
  publicId: string;
  socket: Socket;
  conversations: StoreValue<typeof $conversations>;
};

// Для отмены предыдущего неотвеченного запроса
let abortController = new AbortController();

export const openConversation =
  createEvent<Pick<OpenConversationFxParams, 'publicId'>>();

const openConversationFx = createEffect<OpenConversationFxParams, void>(
  async ({ publicId, socket, conversations }) => {
    abortController.abort();
    abortController = new AbortController();

    const preloadConversation = conversations.find(
      (conversation) => conversation.publicId === publicId,
    );

    if (preloadConversation) {
      activeConversationApi.set(preloadConversation);
    }

    await leaveConversationFx({ socket });
    await joinConversationFx({ socket, data: { conversationId: publicId } });
    await getConversationFx({ publicId, abortController });
  },
);

sample({
  clock: openConversation,
  source: {
    socket: $socket,
    activeConversationPublicId: $activeConversationPublicId,
    conversations: $conversations,
  },
  filter: (source, clock) =>
    clock.publicId !== source.activeConversationPublicId,
  fn: (source, clock) => ({
    publicId: clock.publicId,
    socket: source.socket!,
    conversations: source.conversations,
  }),
  target: openConversationFx,
});
