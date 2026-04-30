import {
  createApi,
  createEffect,
  createEvent,
  createStore,
  sample,
} from 'effector';

import { joinConversationFx } from '../socket/push-events/join-conversation.effect';
import { leaveConversationFx } from '../socket/push-events/leave-conversation.effect';
import { $socket, type Socket } from '../socket/socket.store';
import { $activeConversationPublicId } from './active-conversation.store';
import { getConversationFx } from './get-conversation.effect';

type OpenConversationFxParams = {
  publicId: string;
  socket: Socket;
  abortController: AbortController;
};

// Для отмены предыдущего неотвеченного запроса
const $abortController = createStore<AbortController>(new AbortController());
const abortControllerApi = createApi($abortController, {
  update: () => new AbortController(),
});

export const openConversation =
  createEvent<Pick<OpenConversationFxParams, 'publicId'>>();

const openConversationFx = createEffect<OpenConversationFxParams, void>(
  async ({ publicId, socket, abortController }) => {
    abortController.abort();
    abortControllerApi.update();

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
    abortController: $abortController,
  },
  filter: (source, clock) =>
    clock.publicId !== source.activeConversationPublicId,
  fn: (source, clock) => ({
    publicId: clock.publicId,
    socket: source.socket!,
    abortController: source.abortController,
  }),
  target: openConversationFx,
});
