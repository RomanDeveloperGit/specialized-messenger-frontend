import { createEffect, sample } from 'effector';

import {
  $socket,
  joinConversation,
  type SocketEmitEventData,
} from '@/shared/api/socket';
import { reconnectSocket } from '@/shared/api/socket';

import { $activeConversationPublicId } from './active-conversation.store';

type RejoinConversationOnReconnectSocketFxParams = {
  data: SocketEmitEventData<'from-client:conversation.join'>;
};

const rejoinConversationOnReconnectSocketFx = createEffect<
  RejoinConversationOnReconnectSocketFxParams,
  void
>(({ data }) => {
  joinConversation({ data });
});

sample({
  clock: reconnectSocket,
  source: {
    socket: $socket,
    activeConversationPublicId: $activeConversationPublicId,
  },
  filter: (source) => !!source.socket && !!source.activeConversationPublicId,
  fn: (source) => ({
    data: {
      conversationId: source.activeConversationPublicId!,
    },
  }),
  target: rejoinConversationOnReconnectSocketFx,
});
