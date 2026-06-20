import { getUserFullName } from '@/shared/lib/user/get-user-full-name';
import { UNDEFINED_USER } from '@/shared/lib/user/undefined-user';

import { isSystemUserLeftMessage } from '../../message-checker/is-system-user-left-message';
import { MESSAGE_PARSE_ERROR } from '../../message-parse-error';
import type { Preparer } from '../config.interface';

export const prepareSystemUserLeftMessage: Preparer = ({
  lastMessage,
  conversation,
}) => {
  if (!isSystemUserLeftMessage(lastMessage)) return MESSAGE_PARSE_ERROR;

  // Т.к. это ПОСЛЕДНЕЕ сообщение чата, то после него пользователь находится гарантированно в removedParticipants
  const leftParticipant = conversation.removedParticipants.find(
    (participant) =>
      participant.user.publicId === lastMessage.content.userPublicId,
  );

  return `Пользователь ${leftParticipant ? getUserFullName(leftParticipant.user) : UNDEFINED_USER} покинул чат`;
};
