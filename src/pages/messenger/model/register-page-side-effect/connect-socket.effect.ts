import { createEffect, createEvent, restore, scopeBind } from 'effector';

import { io, Socket } from 'socket.io-client';

import {
  createAuthHeaderValue,
  getBase64CredentialsFromLocalStorage,
} from '@/shared/lib/auth';

export const connected = createEvent();
export const disconnected = createEvent();

export const connectSocketFx = createEffect<void, Socket>(() => {
  const scopeConnected = scopeBind(connected, { safe: true });
  const scopeDisconnected = scopeBind(disconnected, { safe: true });

  const socket = io(import.meta.env.APP_WS_ORIGIN, {
    extraHeaders: {
      Authorization: createAuthHeaderValue(
        getBase64CredentialsFromLocalStorage()!,
      ),
    },
  });

  return new Promise((resolve) => {
    socket.on('connect', () => {
      scopeConnected();
      resolve(socket);
    });

    socket.on('disconnect', () => {
      scopeDisconnected();
    });
  });
});

export const $socket = restore(connectSocketFx.doneData, null).reset(
  disconnected,
);
