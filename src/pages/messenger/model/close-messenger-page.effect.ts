import { createEffect, createEvent, sample } from 'effector';

import { $socket, type Socket } from '@/shared/api/socket';

type CloseMessengerPageFxParams = {
  socket: Socket | null;
};

export const closeMessengerPage = createEvent();

const closeMessengerPageFx = createEffect<CloseMessengerPageFxParams, void>(
  async ({ socket }) => {
    socket?.off();
    socket?.disconnect();
  },
);

sample({
  clock: closeMessengerPage,
  source: $socket,
  fn: (source) => ({ socket: source }),
  target: closeMessengerPageFx,
});
