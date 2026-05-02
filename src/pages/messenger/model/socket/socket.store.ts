import { createApi, createStore } from 'effector';

import { Socket as RawSocket } from 'socket.io-client';

import type {
  SocketEmitEventsMap,
  SocketListenEventsMap,
} from '../../../../shared/lib/socket/events';

export type Socket = RawSocket<SocketListenEventsMap, SocketEmitEventsMap>;

export const $socket = createStore<Socket | null>(null);
export const socketApi = createApi($socket, {
  set: (_, socket: Socket) => socket,
  reset: () => null,
});
