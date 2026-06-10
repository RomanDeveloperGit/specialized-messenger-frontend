import { createEvent } from 'effector';

import type { SocketListenEventData } from '../socket.interface';

export const userOffline =
  createEvent<SocketListenEventData<'from-server:user.online'>>();
