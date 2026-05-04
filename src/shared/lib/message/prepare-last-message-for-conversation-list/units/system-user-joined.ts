import { getUserFullName } from '@/shared/lib/user/get-user-full-name';
import { UNDEFINED_USER } from '@/shared/lib/user/undefined-user';

import { isSystemUserJoinedMessage } from '../../message-checker/is-system-user-joined-message';
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
