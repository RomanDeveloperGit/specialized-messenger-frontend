import { createEffect, createEvent, sample } from 'effector';

import type { Socket, SocketEmitEventData } from '../socket.interface';
import { $socket } from '../socket.store';

type LeaveConversationFxParams = {
  socket: Socket;
  data: SocketEmitEventData<'from-client:conversation.leave'>;
};

export const leaveConversation =
  createEvent<Omit<LeaveConversationFxParams, 'socket'>>();

const leaveConversationFx = createEffect<LeaveConversationFxParams, void>(
  ({ socket, data }) => {
    socket.emit('from-client:conversation.leave', data);
  },
);

sample({
  clock: leaveConversation,
  source: $socket,
  fn: (source, clock) => ({
    socket: source!,
    data: clock.data,
  }),
  target: leaveConversationFx,
});
