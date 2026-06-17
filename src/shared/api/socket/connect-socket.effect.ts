import { createEffect } from 'effector';

import { io } from 'socket.io-client';

import {
  createAuthHeaderValue,
  getBase64CredentialsFromLocalStorage,
} from '@/shared/lib/auth';

import { listenEventsConfig } from './listen-events/config';
import { reconnectSocket } from './listen-events/reconnect-socket.event';
import type { Socket } from './socket.interface';
import { isSocketConnectedApi, socketApi } from './socket.store';

export const connectSocketFx = createEffect<void, Socket>(() => {
  const socket: Socket = io(import.meta.env.APP_WS_ORIGIN, {
    extraHeaders: {
      Authorization: createAuthHeaderValue(
        getBase64CredentialsFromLocalStorage()!,
      ),
    },
  });

  return new Promise((resolve) => {
    socket.on('connect', () => {
      socketApi.set(socket);
      isSocketConnectedApi.set(true);

      resolve(socket);
    });

    socket.io.on('reconnect', () => {
      reconnectSocket();
    });

    socket.on('disconnect', () => {
      isSocketConnectedApi.set(false);
    });

    Object.entries(listenEventsConfig).forEach(([eventName, event]) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      socket.on(eventName, event);
    });
  });
});
