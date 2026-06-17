import { createEvent } from 'effector';

import type { SocketListenEventData } from '../socket.interface';

export const conversationsRemove =
  createEvent<SocketListenEventData<'from-server:conversations.remove'>>();
