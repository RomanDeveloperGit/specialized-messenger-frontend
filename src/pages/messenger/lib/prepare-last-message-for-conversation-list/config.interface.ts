import type { Dto } from '@specialized-messenger/api/specs';

export type MessageTypeName = Dto['Message']['type']['name'];

export type Preparer = (
  message: Dto['Message'],
  participants: Dto['ConversationParticipant'][],
) => string;

export type Config = Record<MessageTypeName, Preparer>;
