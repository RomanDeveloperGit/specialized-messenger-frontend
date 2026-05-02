import { createEffect } from 'effector';

import type { SocketListenEventData } from '@/shared/lib/socket/events';

import { activeConversationApi } from '../../active-conversation/active-conversation.store';

type ReceiveMessageFxParams = {
  data: SocketListenEventData<'from-server:message.new'>;
};

export const receiveMessageFx = createEffect<ReceiveMessageFxParams, void>(
  ({ data }) => {
    activeConversationApi.addMessage(data.message);
  },
);
