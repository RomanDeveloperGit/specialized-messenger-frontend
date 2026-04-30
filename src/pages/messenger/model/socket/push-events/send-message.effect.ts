import { createEffect, createEvent, sample } from 'effector';

import type { WSClientToServerEvents } from '@specialized-messenger/api/constants/chat.constants';

import { $socket, type Socket } from '../socket.store';

type SendMessageFxParams = {
  socket: Socket;
  data: Parameters<WSClientToServerEvents['from-client:message.new']>[0];
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
