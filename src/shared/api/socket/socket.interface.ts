import { Socket as RawSocket } from 'socket.io-client';

import type { Dto } from '@specialized-messenger/api/specs';

export interface SocketEmitEventsMap {
  'from-client:conversation.join': (data: { conversationId: string }) => void;
  'from-client:conversation.leave': (data: void) => void;
  'from-client:message.new': (data: { content: string }) => void;
}

export type SocketEmitEventData<T extends keyof SocketEmitEventsMap> =
  Parameters<SocketEmitEventsMap[T]>[0];

export interface SocketListenEventsMap {
  'from-server:message.new': (data: { message: Dto['Message'] }) => void;
  'from-server:conversations.update': (data: void) => void;
  'from-server:user.online': (data: { user: Dto['User'] }) => void;
  'from-server:user.offline': (data: { user: Dto['User'] }) => void;
  'from-server:error': (data: void) => void;
}

export type SocketListenEventData<T extends keyof SocketListenEventsMap> =
  Parameters<SocketListenEventsMap[T]>[0];

export type Socket = RawSocket<SocketListenEventsMap, SocketEmitEventsMap>;
