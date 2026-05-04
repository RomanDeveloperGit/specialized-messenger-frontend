import { createEffect, createEvent, sample } from 'effector';

import type { Socket, SocketEmitEventData } from '../socket.interface';
import { $socket } from '../socket.store';

type SendMessageFxParams = {
  socket: Socket;
  data: SocketEmitEventData<'from-client:message.new'>;
};

export const sendMessage = createEvent<SendMessageFxParams['data']>();

const sendMessageFx = createEffect<SendMessageFxParams, void>(
  ({ socket, data }) => {
    socket.emit('from-client:message.new', data);
  },
);

sample({
  clock: sendMessage,
  source: $socket,
  fn: (source, clock) => ({ socket: source!, data: clock }),
  target: sendMessageFx,
});
