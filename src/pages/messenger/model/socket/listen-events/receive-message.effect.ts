import { createEffect } from 'effector';

import type { SocketListenEventData } from '@/pages/messenger/lib/socket-events.interface';

import { activeConversationApi } from '../../active-conversation/active-conversation.store';

type ReceiveMessageFxParams = {
  data: SocketListenEventData<'from-server:message.new'>;
};

export const receiveMessageFx = createEffect<ReceiveMessageFxParams, void>(
  ({ data }) => {
    activeConversationApi.addMessage(data.message);
  },
);
