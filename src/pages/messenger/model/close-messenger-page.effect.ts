import { createEffect, createEvent, sample } from 'effector';

import { $socket, type Socket, socketApi } from '@/shared/api/socket';

type CloseMessengerPageFxParams = {
  socket: Socket;
};

export const closeMessengerPage = createEvent();

const closeMessengerPageFx = createEffect<CloseMessengerPageFxParams, void>(
  async ({ socket }) => {
    socket.off();
    socket.disconnect();

    socketApi.reset();
  },
);

sample({
  clock: closeMessengerPage,
  source: $socket,
  fn: (source) => ({ socket: source! }),
  target: closeMessengerPageFx,
});
