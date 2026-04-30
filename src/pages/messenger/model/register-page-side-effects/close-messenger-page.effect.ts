import { createEffect } from 'effector';

import { type Socket } from '../socket/socket.store';

export const closeMessengerPageFx = createEffect<
  { socket: Socket | null },
  void
>(async ({ socket }) => {
  socket?.off();
  socket?.disconnect();
});
