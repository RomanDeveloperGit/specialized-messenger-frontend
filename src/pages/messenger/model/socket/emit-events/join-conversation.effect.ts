import { createEffect } from 'effector';

import type { SocketEmitEventData } from '@/shared/lib/socket/events';

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
