import type { Dto } from '@specialized-messenger/api/specs';

export type MessageTypeName = Dto['Message']['type']['name'];

export type Preparer = (data: {
  message: Dto['Message'];
  allParticipants: Dto['ConversationParticipant'][];
}) => string;

export type Config = Record<MessageTypeName, Preparer>;
