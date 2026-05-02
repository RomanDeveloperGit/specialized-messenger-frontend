import { createEffect, createEvent, sample } from 'effector';

import type { SocketEmitEventData } from '@/pages/messenger/model/socket/lib/socket-events.interface';

import { $socket, type Socket } from '../socket.store';

type SendMessageFxParams = {
  socket: Socket;
  data: SocketEmitEventData<'from-client:message.new'>;
};

export const sendMessage = createEvent<Pick<SendMessageFxParams, 'data'>>();

const sendMessageFx = createEffect<SendMessageFxParams, void>(
  ({ socket, data }) => {
    socket.emit('from-client:message.new', data);
  },
);

sample({
  clock: sendMessage,
  source: $socket,
  fn: (source, clock) => ({ socket: source!, data: clock.data }),
  target: sendMessageFx,
});
