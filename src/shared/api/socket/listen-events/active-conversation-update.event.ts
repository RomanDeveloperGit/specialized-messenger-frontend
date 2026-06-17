import { createEvent } from 'effector';

import type { SocketListenEventData } from '../socket.interface';

export const activeConversationUpdate =
  createEvent<SocketListenEventData<'from-server:activeConversation.update'>>();
