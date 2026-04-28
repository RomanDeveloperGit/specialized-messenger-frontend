import { createEffect, createEvent, scopeBind } from 'effector';

import { io, Socket } from 'socket.io-client';

import {
  createAuthHeaderValue,
  getBase64CredentialsFromLocalStorage,
} from '@/shared/lib/auth';

import { receiveMessage } from '../active-conversation/active-conversation.store';
import { updateConversations } from '../conversations.store';

export const connected = createEvent();
export const disconnected = createEvent();

export const connectSocketFx = createEffect<void, Socket>(() => {
  const scopeConnected = scopeBind(connected, { safe: true });
  const scopeReceiveMessage = scopeBind(receiveMessage, { safe: true });
  const scopeUpdateConversations = scopeBind(updateConversations, {
    safe: true,
  });
  const scopeDisconnected = scopeBind(disconnected, { safe: true });

  const socket: Socket = io(import.meta.env.APP_WS_ORIGIN, {
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

    socket.on('from-server:message.new', (data) => {
      scopeReceiveMessage(data);
    });

    socket.on('from-server:conversations.update', () => {
      scopeUpdateConversations();
    });

    socket.on('disconnect', () => {
      scopeDisconnected();
    });
  });
});
