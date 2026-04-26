import { type Dto } from '@specialized-messenger/api/specs';

import { getUserInitials } from '../../../shared/lib/get-user-initials';
import { isGroupConversation } from '../../../shared/lib/is-group-conversation';

export const getConversationInitials = ({
  conversation,
  viewerUserId,
}: {
  conversation: Dto['Conversation'];
  viewerUserId: string;
}) => {
  if (isGroupConversation(conversation)) {
    const words = conversation.name.split(' ');
    const firstWord = words.at(0)!;
    const lastWord = words.at(-1) || '';

    if (words.length === 1) return firstWord?.charAt(0);

    return `${firstWord.charAt(0)}${lastWord.charAt(0)}`;
  }

  // Т.к. это DIRECT conversation, то там только один пользователь такой найдется
  const recipient = conversation.participants.find(
    (participant) => participant.userId !== viewerUserId,
  )!;

  return getUserInitials({
    firstName: recipient.user.firstName,
    lastName: recipient.user.lastName,
  });
};
