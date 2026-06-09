import { useUnit } from 'effector-react';

import { $conversations } from '@/entities/conversations';

import { ConversationItem } from './conversation-item';
import { ConversationListWrapper } from './conversation-list-wrapper';

export const ConversationList = () => {
  const [conversations] = useUnit([$conversations]);

  return (
    <ConversationListWrapper>
      {conversations.map((conversation) => (
        <ConversationItem conversation={conversation} key={conversation.id} />
      ))}
    </ConversationListWrapper>
  );
};
