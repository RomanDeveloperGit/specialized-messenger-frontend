import type { Dto } from '@specialized-messenger/api/specs';

const MESSAGE_SYSTEM_TYPE_NAMES = [
  'SYSTEM_CONVERSATION_CREATED',
  'SYSTEM_USER_JOINED',
];

export const isSystemMessage = (message: Dto['Message']) => {
  return MESSAGE_SYSTEM_TYPE_NAMES.includes(message.type.name);
};
