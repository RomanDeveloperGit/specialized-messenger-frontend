import { createApi, createStore } from 'effector';

import type { Socket } from './socket.interface';

export const $socket = createStore<Socket | null>(null);
export const socketApi = createApi($socket, {
  set: (_, socket: Socket) => socket,
  reset: () => null,
});

export const $isSocketConnected = createStore<boolean>(false);
export const isSocketConnectedApi = createApi($isSocketConnected, {
  set: (_, isSocketConnected: boolean) => isSocketConnected,
});
