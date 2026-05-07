import { createEffect } from 'effector';

import { io } from 'socket.io-client';

import {
  createAuthHeaderValue,
  getBase64CredentialsFromLocalStorage,
} from '@/shared/lib/auth';

import { receiveMessage } from './listen-events/receive-message.event';
import { reconnectSocket } from './listen-events/reconnect-socket.event';
import { updateConversations } from './listen-events/update-conversations.event';
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

    socket.on('from-server:message.new', (data) => {
      receiveMessage(data);
    });

    socket.on('from-server:conversations.update', () => {
      updateConversations();
    });
  });
});
