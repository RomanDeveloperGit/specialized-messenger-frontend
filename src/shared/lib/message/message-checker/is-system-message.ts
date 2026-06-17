import type { Dto } from '@specialized-messenger/api/specs';

export const isSystemMessage = (message: Dto['Message']) =>
  message.type.name.startsWith('SYSTEM_');
