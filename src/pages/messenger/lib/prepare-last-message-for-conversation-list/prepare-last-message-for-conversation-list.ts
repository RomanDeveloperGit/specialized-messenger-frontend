import type { Dto } from '@specialized-messenger/api/specs';

import { CONFIG } from './config.implementation';

export const prepareLastMessageForConversationList = (
  conversation: Dto['Conversation'],
) => {
  const lastMessage = conversation.messages.at(-1);
  if (!lastMessage) return '';

  return CONFIG[lastMessage.type.name](lastMessage, conversation.participants);
};
