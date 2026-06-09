import { useUnit } from 'effector-react';

import {
  $conversationsCount,
  $hasConversationsError,
} from '@/entities/conversations';

import { ConversationList } from './conversation-list';
import { ConversationListEmpty } from './conversation-list-empty';
import { ConversationListError } from './conversation-list-error';

export const ConversationListFacade = () => {
  const [hasConversationsError, conversationsCount] = useUnit([
    $hasConversationsError,
    $conversationsCount,
  ]);

  if (hasConversationsError) {
    return <ConversationListError />;
  }

  if (!conversationsCount) {
    return <ConversationListEmpty />;
  }

  return <ConversationList />;
};
