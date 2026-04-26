import { type Dto } from '@specialized-messenger/api/specs';

import { getUserFullName } from './get-user-full-name';
import { isGroupConversation } from './is-group-conversation';

export const getConversationFullName = ({
  conversation,
  viewerUserId,
}: {
  conversation: Dto['Conversation'];
  viewerUserId: string;
}) => {
  if (isGroupConversation(conversation)) {
    return conversation.name;
  }

  // Т.к. это DIRECT conversation, то там только один пользователь такой найдется
  const recipient = conversation.participants.find(
    (participant) => participant.userId !== viewerUserId,
  )!;

  return getUserFullName(recipient.user);
};
