import { createEffect } from 'effector';

import type { SocketEmitEventData } from '@/pages/messenger/lib/socket-events.interface';

import type { Socket } from '../socket.store';

type JoinConversationFxParams = {
  socket: Socket;
  data: SocketEmitEventData<'from-client:conversation.join'>;
};

export const joinConversationFx = createEffect<JoinConversationFxParams, void>(
  ({ socket, data }) => {
    socket.emit('from-client:conversation.join', data);
  },
);
