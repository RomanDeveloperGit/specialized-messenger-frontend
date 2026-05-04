import { createEffect } from 'effector';

import { io } from 'socket.io-client';

import {
  createAuthHeaderValue,
  getBase64CredentialsFromLocalStorage,
} from '@/shared/lib/auth';

import { receiveMessage } from './listen-events/receive-message.event';
import { updateConversations } from './listen-events/update-conversations.event';
import type { Socket } from './socket.interface';
import { socketApi } from './socket.store';

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
      receiveMessage(data);
    });

    socket.on('from-server:conversations.update', () => {
      updateConversations();
    });
  });
});
