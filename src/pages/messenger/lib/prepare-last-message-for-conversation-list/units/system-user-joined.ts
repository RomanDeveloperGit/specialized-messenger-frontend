import { getUserFullName } from '@/shared/lib/get-user-full-name';

import { isSystemUserJoinedMessage } from '../../message-checker/is-system-user-joined-message';
import { UNDEFINED_USER } from '../../undefined-user';
import type { Preparer } from '../config.interface';

export const prepareSystemUserJoinedMessage: Preparer = (
  message,
  participants,
) => {
  if (!isSystemUserJoinedMessage(message)) return '';

  const joinedParticipant = participants.find(
    (participant) => participant.user.publicId === message.content.userPublicId,
  );

  return `Присоединился пользователь ${joinedParticipant ? getUserFullName(joinedParticipant.user) : UNDEFINED_USER}`;
};
