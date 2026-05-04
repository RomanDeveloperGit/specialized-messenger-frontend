import { createEvent } from 'effector';

import type { SocketListenEventData } from '../socket.interface';

export const updateConversations =
  createEvent<SocketListenEventData<'from-server:conversations.update'>>();
