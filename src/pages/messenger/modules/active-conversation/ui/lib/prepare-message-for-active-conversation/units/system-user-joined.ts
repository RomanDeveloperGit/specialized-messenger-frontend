import { getUserFullName } from '@/shared/lib/get-user-full-name';

import { isSystemUserJoinedMessage } from '../../../../../../../../modules/conversation/lib/message-checker/is-system-user-joined-message';
import { UNDEFINED_USER } from '../../../../../../../../modules/conversation/lib/undefined-user';
import type { Preparer } from '../config.interface';

export const prepareSystemUserJoinedMessage: Preparer = (
  message,
  conversation,
) => {
  if (!isSystemUserJoinedMessage(message)) return '';

  const joinedParticipant = conversation.participants.find(
    (participant) => participant.user.publicId === message.content.userPublicId,
  );

  return `Присоединился пользователь ${joinedParticipant ? getUserFullName(joinedParticipant.user) : UNDEFINED_USER}`;
};
