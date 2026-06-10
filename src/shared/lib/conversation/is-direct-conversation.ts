import type { Dto } from '@specialized-messenger/api/specs';

type GroupConversation = Dto['Conversation'] & {
  name: null;
  type: Dto['Conversation']['type'] & {
    name: 'DIRECT';
  };
};

export const isDirectConversation = (
  conversation: Dto['Conversation'],
): conversation is GroupConversation => {
  return conversation.type.name === 'DIRECT';
};
