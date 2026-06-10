import { createEvent } from 'effector';

import type { SocketListenEventData } from '../socket.interface';

export const messageNew =
  createEvent<SocketListenEventData<'from-server:message.new'>>();
