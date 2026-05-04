import { createEffect, createEvent, sample } from 'effector';

import type { Socket, SocketEmitEventData } from '../socket.interface';
import { $socket } from '../socket.store';

type JoinConversationFxParams = {
  socket: Socket;
  data: SocketEmitEventData<'from-client:conversation.join'>;
  ack: () => void;
};

export const joinConversation =
  createEvent<Omit<JoinConversationFxParams, 'socket'>>();

const joinConversationFx = createEffect<JoinConversationFxParams, void>(
  ({ socket, data, ack }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    socket.emit('from-client:conversation.join', data, ack);
  },
);

sample({
  clock: joinConversation,
  source: $socket,
  fn: (source, clock) => ({
    socket: source!,
    data: clock.data,
    ack: clock.ack,
  }),
  target: joinConversationFx,
});
