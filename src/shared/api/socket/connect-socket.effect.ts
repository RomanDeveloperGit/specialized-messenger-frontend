import { createEffect } from 'effector';

import { io } from 'socket.io-client';

import {
  createAuthHeaderValue,
  getBase64CredentialsFromLocalStorage,
} from '@/shared/lib/auth';

import { conversationsUpdate } from './listen-events/conversations-update.event';
import { messageNew } from './listen-events/message-new.event';
import { reconnectSocket } from './listen-events/reconnect-socket.event';
import { userOffline } from './listen-events/user-offline.event';
import { userOnline } from './listen-events/user-online.event';
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

    socket.on('from-server:conversations.update', () => {
      conversationsUpdate();
    });

    socket.on('from-server:message.new', (data) => {
      messageNew(data);
    });

    socket.on('from-server:user.online', (data) => {
      userOnline(data);
    });

    socket.on('from-server:user.offline', (data) => {
      userOffline(data);
    });
  });
});
