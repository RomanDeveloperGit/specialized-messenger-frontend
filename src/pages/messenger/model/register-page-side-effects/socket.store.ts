import { createEffect, restore } from 'effector';

import { Socket as _Socket } from 'socket.io-client';

import type {
  WSClientToServerEvents,
  WSServerToClientEvents,
} from '@specialized-messenger/api/constants/chat.constants';

import { connectSocketFx, disconnected } from './connect-socket.effect';

export type Socket = _Socket<WSServerToClientEvents, WSClientToServerEvents>;

export const $socket = restore(connectSocketFx.doneData, null).reset(
  disconnected,
);

export const joinConversationFx = createEffect<
  {
    socket: Socket;
    data: Parameters<
      WSClientToServerEvents['from-client:conversation.join']
    >[0];
  },
  void
>(({ socket, data }) => {
  socket.emit('from-client:conversation.join', data);
});

// можно не кидать этот ивент, т.к. сервер сам отрубит меня от предыдущей комнаты
export const leaveConversationFx = createEffect<
  {
    socket: Socket;
    data: Parameters<
      WSClientToServerEvents['from-client:conversation.leave']
    >[0];
  },
  void
>(({ socket, data }) => {
  socket.emit('from-client:conversation.leave', data);
});

export const sendMessageFx = createEffect<
  {
    socket: Socket;
    data: Parameters<WSClientToServerEvents['from-client:message.new']>[0];
  },
  void
>(({ socket, data }) => {
  socket.emit('from-client:message.new', data);
});
