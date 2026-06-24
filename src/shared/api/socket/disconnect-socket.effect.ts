import { createEffect, createEvent, sample } from 'effector';

import { $socket, type Socket } from '@/shared/api/socket';

type DisconnectSocketFxParams = {
  socket: Socket | null;
};

export const disconnectSocket = createEvent();

const disconnectSocketFx = createEffect<DisconnectSocketFxParams, void>(
  async ({ socket }) => {
    socket?.disconnect();
  },
);

sample({
  clock: disconnectSocket,
  source: $socket,
  fn: (source) => ({ socket: source }),
  target: disconnectSocketFx,
});
