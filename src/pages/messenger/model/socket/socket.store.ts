import { createApi, createStore } from 'effector';

import { Socket as RawSocket } from 'socket.io-client';

import type {
  WSClientToServerEvents,
  WSServerToClientEvents,
} from '@specialized-messenger/api/constants/chat.constants';

export type Socket = RawSocket<WSServerToClientEvents, WSClientToServerEvents>;

export const $socket = createStore<Socket | null>(null);
export const socketApi = createApi($socket, {
  set: (_, socket: Socket) => socket,
  reset: () => null,
});
