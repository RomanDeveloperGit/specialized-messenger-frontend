import { getLocalTime } from '@/shared/lib/date/get-local-time';
import { getUserFullName } from '@/shared/lib/user/get-user-full-name';
import { UNDEFINED_USER } from '@/shared/lib/user/undefined-user';

import { isSystemUserLeftMessage } from '../../message-checker/is-system-user-left-message';
import { MESSAGE_PARSE_ERROR } from '../../message-parse-error';
import type { Preparer } from '../config.interface';

export const prepareSystemUserLeftMessage: Preparer = (
  message,
  conversation,
) => {
  if (!isSystemUserLeftMessage(message)) return MESSAGE_PARSE_ERROR;

  const leftParticipant = conversation.participants.find(
    (participant) => participant.user.publicId === message.content.userPublicId,
  );

  return `Пользователь ${leftParticipant ? getUserFullName(leftParticipant.user) : UNDEFINED_USER} покинул чат в ${getLocalTime(new Date(message.createdAt))}`;
};
