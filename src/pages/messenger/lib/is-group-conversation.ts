import type { Dto } from '@specialized-messenger/api/specs';

type GroupConversation = Dto['Conversation'] & {
  name: string;
  type: Dto['Conversation']['type'] & {
    name: 'GROUP';
  };
};

export const isGroupConversation = (
  conversation: Dto['Conversation'],
): conversation is GroupConversation => {
  return conversation.type.name === 'GROUP';
};
