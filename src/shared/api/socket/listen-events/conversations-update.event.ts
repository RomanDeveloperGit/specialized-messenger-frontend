import { createEvent } from 'effector';

import type { SocketListenEventData } from '../socket.interface';

export const conversationsUpdate =
  createEvent<SocketListenEventData<'from-server:conversations.update'>>();
