import { createEffect, createEvent, sample } from 'effector';

import type { Socket, SocketEmitEventData } from '../socket.interface';
import { $socket } from '../socket.store';

type LeaveConversationFxParams = {
  socket: Socket;
  data: SocketEmitEventData<'from-client:conversation.leave'>;
  ack: () => void;
};

export const leaveConversation =
  createEvent<Omit<LeaveConversationFxParams, 'socket'>>();

const leaveConversationFx = createEffect<LeaveConversationFxParams, void>(
  ({ socket, data, ack }) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    socket.emit('from-client:conversation.leave', data, ack);
  },
);

sample({
  clock: leaveConversation,
  source: $socket,
  fn: (source, clock) => ({
    socket: source!,
    data: clock.data,
    ack: clock.ack,
  }),
  target: leaveConversationFx,
});
