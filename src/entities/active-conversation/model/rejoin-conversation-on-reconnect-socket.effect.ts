import { createEffect, sample } from 'effector';

import {
  $socket,
  joinConversation,
  type Socket,
  type SocketEmitEventData,
} from '@/shared/api/socket';
import { reconnectSocket } from '@/shared/api/socket/listen-events/reconnect-socket.event';

import { $activeConversationPublicId } from './active-conversation.store';

type RejoinConversationOnReconnectSocketFxParams = {
  socket: Socket;
  data: SocketEmitEventData<'from-client:conversation.join'>;
};

const rejoinConversationOnReconnectSocketFx = createEffect<
  RejoinConversationOnReconnectSocketFxParams,
  void
>(({ data }) => {
  joinConversation({ data });
});

sample({
  clock: reconnectSocket,
  source: {
    socket: $socket,
    activeConversationPublicId: $activeConversationPublicId,
  },
  filter: (source) => !!source.socket && !!source.activeConversationPublicId,
  fn: (source) => ({
    socket: source.socket!,
    data: {
      conversationId: source.activeConversationPublicId!,
    },
  }),
  target: rejoinConversationOnReconnectSocketFx,
});
