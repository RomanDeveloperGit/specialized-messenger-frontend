import { createEvent } from 'effector';

import type { SocketListenEventData } from '../socket.interface';

export const receiveMessage =
  createEvent<SocketListenEventData<'from-server:message.new'>>();
