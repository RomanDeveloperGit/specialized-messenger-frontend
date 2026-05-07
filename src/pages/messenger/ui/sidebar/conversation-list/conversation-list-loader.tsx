import { ConversationItemSkeleton } from './conversation-item-skeleton';
import { ConversationListWrapper } from './conversation-list-wrapper';

export const ConversationListLoader = () => {
  return (
    <ConversationListWrapper>
      {Array.from({ length: 5 }).map((_, index) => (
        <ConversationItemSkeleton key={index} />
      ))}
    </ConversationListWrapper>
  );
};
