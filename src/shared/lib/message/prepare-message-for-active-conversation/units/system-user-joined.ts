import { getLocalTime } from '@/shared/lib/date/get-local-time';
import { getUserFullName } from '@/shared/lib/user/get-user-full-name';
import { UNDEFINED_USER } from '@/shared/lib/user/undefined-user';

import { isSystemUserJoinedMessage } from '../../message-checker/is-system-user-joined-message';
import { MESSAGE_PARSE_ERROR } from '../../message-parse-error';
import type { Preparer } from '../config.interface';

export const prepareSystemUserJoinedMessage: Preparer = ({
  message,
  allParticipants,
}) => {
  if (!isSystemUserJoinedMessage(message)) return MESSAGE_PARSE_ERROR;

  const joinedParticipant = allParticipants.find(
    (participant) => participant.user.publicId === message.content.userPublicId,
  );

  return `Пользователь ${joinedParticipant ? getUserFullName(joinedParticipant.user) : UNDEFINED_USER} присоединился в ${getLocalTime(new Date(message.createdAt))}`;
};
