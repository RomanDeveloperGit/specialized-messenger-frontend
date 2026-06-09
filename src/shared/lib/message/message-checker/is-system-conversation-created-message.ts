import type { Dto } from '@specialized-messenger/api/specs';

type SystemConversationCreatedMessage = Omit<Dto['Message'], 'content'> & {
  type: { name: 'SYSTEM_CONVERSATION_CREATED' };
  content: '';
};

export const isSystemConversationCreatedMessage = (
  message: Omit<Dto['Message'], 'content'>,
): message is SystemConversationCreatedMessage => {
  return (
    message.type.name === 'SYSTEM_CONVERSATION_CREATED' && 'content' in message
  );
};
