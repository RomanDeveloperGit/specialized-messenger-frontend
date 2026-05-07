import { useUnit } from 'effector-react';

import {
  $conversations,
  $hasConversationsError,
  getConversationsFx,
} from '@/entities/conversations';

import { ConversationItem } from './conversation-item';
import { ConversationItemSkeleton } from './conversation-item-skeleton';
import { ConversationListError } from './conversation-list-error';
import { ConversationListWrapper } from './conversation-list-wrapper';

export const ConversationList = () => {
  const [isConversationsPending, hasConversationsError, conversations] =
    useUnit([
      getConversationsFx.pending,
      $hasConversationsError,
      $conversations,
    ]);

  switch (true) {
    case isConversationsPending:
      return (
        <ConversationListWrapper>
          {Array.from({ length: 5 }).map((_, index) => (
            <ConversationItemSkeleton key={index} />
          ))}
        </ConversationListWrapper>
      );
    case hasConversationsError:
      return (
        <ConversationListWrapper>
          <ConversationListError />
        </ConversationListWrapper>
      );
    default:
      return (
        <ConversationListWrapper>
          {conversations.map((conversation) => (
            <ConversationItem
              conversation={conversation}
              key={conversation.id}
            />
          ))}
        </ConversationListWrapper>
      );
  }
};
