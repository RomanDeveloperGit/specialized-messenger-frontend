import { createEffect } from 'effector';

import { io } from 'socket.io-client';

import {
  createAuthHeaderValue,
  getBase64CredentialsFromLocalStorage,
} from '@/shared/lib/auth';

import { receiveMessageFx } from './listen-events/receive-message.effect';
import { updateConversationsFx } from './listen-events/update-conversations.effect';
import { type Socket, socketApi } from './socket.store';

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

      resolve(socket);
    });

    socket.on('disconnect', () => {
      socketApi.reset();
    });

    socket.on('from-server:message.new', (data) => {
      receiveMessageFx({ data });
    });

    socket.on('from-server:conversations.update', () => {
      updateConversationsFx();
    });
  });
});
