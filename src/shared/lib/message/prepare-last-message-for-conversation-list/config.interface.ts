import type { Dto } from '@specialized-messenger/api/specs';

export type MessageTypeName = Dto['Message']['type']['name'];

export type Preparer = (data: {
  lastMessage: Dto['Message'];
  conversation: Dto['Conversation'];
}) => string;

export type Config = Record<MessageTypeName, Preparer>;
