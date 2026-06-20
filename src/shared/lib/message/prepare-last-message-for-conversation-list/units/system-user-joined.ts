import { getUserFullName } from '@/shared/lib/user/get-user-full-name';
import { UNDEFINED_USER } from '@/shared/lib/user/undefined-user';

import { isSystemUserJoinedMessage } from '../../message-checker/is-system-user-joined-message';
import { MESSAGE_PARSE_ERROR } from '../../message-parse-error';
import type { Preparer } from '../config.interface';

export const prepareSystemUserJoinedMessage: Preparer = ({
  lastMessage,
  conversation,
}) => {
  if (!isSystemUserJoinedMessage(lastMessage)) return MESSAGE_PARSE_ERROR;

  const joinedParticipant = conversation.participants.find(
    (participant) =>
      participant.user.publicId === lastMessage.content.userPublicId,
  );

  return `Пользователь ${joinedParticipant ? getUserFullName(joinedParticipant.user) : UNDEFINED_USER} присоединился`;
};
