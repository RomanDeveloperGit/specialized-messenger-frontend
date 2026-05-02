import type { Config } from './config.interface';
import { prepareSystemConversationCreatedMessage } from './units/system-conversation-created';
import { prepareSystemUserJoinedMessage } from './units/system-user-joined';
import { prepareTextMessage } from './units/text';

export const CONFIG: Config = {
  SYSTEM_CONVERSATION_CREATED: prepareSystemConversationCreatedMessage,
  SYSTEM_USER_JOINED: prepareSystemUserJoinedMessage,
  TEXT: prepareTextMessage,
};
