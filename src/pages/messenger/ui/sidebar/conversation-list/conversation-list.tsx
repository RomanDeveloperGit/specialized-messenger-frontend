import { useRef } from 'react';

import { useUnit } from 'effector-react';

import {
  $conversations,
  $hasConversationsError,
  getConversationsFx,
} from '@/entities/conversations';

import { ConversationItem } from './conversation-item';
import { ConversationListError } from './conversation-list-error';
import { ConversationListLoader } from './conversation-list-loader';
import { ConversationListWrapper } from './conversation-list-wrapper';

export const ConversationList = () => {
  const [isConversationsPending, hasConversationsError, conversations] =
    useUnit([
      getConversationsFx.pending,
      $hasConversationsError,
      $conversations,
    ]);

  const savedScrollY = useRef(0);

  const onScroll = (y: number) => {
    savedScrollY.current = y;
  };

  switch (true) {
    case isConversationsPending:
      return <ConversationListLoader />;
    case hasConversationsError:
      return <ConversationListError />;
    default:
      return (
        <ConversationListWrapper
          // eslint-disable-next-line react-hooks/refs
          scrollYPosition={savedScrollY.current}
          onScroll={onScroll}
        >
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
