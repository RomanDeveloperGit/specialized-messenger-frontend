import { createEvent } from 'effector';

import type { SocketListenEventData } from '../socket.interface';

export const userOnline =
  createEvent<SocketListenEventData<'from-server:user.online'>>();
