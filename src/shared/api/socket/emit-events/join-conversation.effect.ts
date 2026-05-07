import { createEffect, createEvent, sample } from 'effector';

import type { Socket, SocketEmitEventData } from '../socket.interface';
import { $socket } from '../socket.store';

type JoinConversationFxParams = {
  socket: Socket;
  data: SocketEmitEventData<'from-client:conversation.join'>;
};

export const joinConversation =
  createEvent<Omit<JoinConversationFxParams, 'socket'>>();

const joinConversationFx = createEffect<JoinConversationFxParams, void>(
  ({ socket, data }) => {
    socket.emit('from-client:conversation.join', data);
  },
);

sample({
  clock: joinConversation,
  source: $socket,
  fn: (source, clock) => ({
    socket: source!,
    data: clock.data,
  }),
  target: joinConversationFx,
});
