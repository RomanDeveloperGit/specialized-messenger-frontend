import type { Dto } from '@specialized-messenger/api/specs';

import { CONFIG } from './config.implementation';

export const prepareMessageForActiveConversation = ({
  message,
  conversation,
}: {
  message: Dto['Message'];
  conversation: Dto['Conversation'];
}) => {
  return CONFIG[message.type.name](message, conversation);
};
