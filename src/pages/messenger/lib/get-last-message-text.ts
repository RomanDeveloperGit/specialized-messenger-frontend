import type { MessageContent } from '@specialized-messenger/api/constants/chat.constants';
import type { Dto } from '@specialized-messenger/api/specs';

import { getUserFullName } from '@/shared/lib/get-user-full-name';

export const getLastMessageText = ({
  message,
  participants,
}: {
  message: Dto['Message'];
  participants: Dto['ConversationParticipant'][];
}) => {
  switch (message.type.name) {
    case 'SYSTEM_CONVERSATION_CREATED': {
      return 'Чат создан';
    }
    case 'SYSTEM_USER_JOINED': {
      const content =
        message.content as unknown as MessageContent<'SYSTEM_USER_JOINED'>;
      const joinedParticipant = participants.find(
        (participant) => participant.user.publicId === content.userPublicId,
      )!;

      return `Присоединился пользователь ${getUserFullName(joinedParticipant.user)}`;
    }
    case 'TEXT': {
      const content = message.content as unknown as MessageContent<'TEXT'>;

      return `${message.author!.firstName}: ${content.text}`;
    }
  }
};
