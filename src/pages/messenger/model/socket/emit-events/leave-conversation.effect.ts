import { createEffect } from 'effector';

import type { Socket } from '../socket.store';

type LeaveConversationFxParams = {
  socket: Socket;
};

export const leaveConversationFx = createEffect<
  LeaveConversationFxParams,
  void
>(({ socket, data }) => {
  socket.emit('from-client:conversation.leave', data);
});
