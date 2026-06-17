import type { Event } from 'effector';

import type { SocketListenEventsMap } from '../socket.interface';
import { activeConversationUpdate } from './active-conversation-update.event';
import { conversationsRemove } from './conversations-remove.event';
import { conversationsUpdate } from './conversations-update.event';
import { messageNew } from './message-new.event';
import { userOffline } from './user-offline.event';
import { userOnline } from './user-online.event';

export const listenEventsConfig: {
  [K in keyof SocketListenEventsMap]: Event<
    Parameters<SocketListenEventsMap[K]>[0]
  >;
} = {
  'from-server:conversations.update': conversationsUpdate,
  'from-server:conversations.remove': conversationsRemove,
  'from-server:activeConversation.update': activeConversationUpdate,
  'from-server:message.new': messageNew,
  'from-server:user.online': userOnline,
  'from-server:user.offline': userOffline,
} as const;
