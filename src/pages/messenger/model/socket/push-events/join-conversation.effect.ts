import { createEffect } from 'effector';

import type { WSClientToServerEvents } from '@specialized-messenger/api/constants/chat.constants';

import type { Socket } from '../socket.store';

type JoinConversationFxParams = {
  socket: Socket;
  data: Parameters<WSClientToServerEvents['from-client:conversation.join']>[0];
};

export const joinConversationFx = createEffect<JoinConversationFxParams, void>(
  ({ socket, data }) => {
    socket.emit('from-client:conversation.join', data);
  },
);
