import { createEffect } from 'effector';

import type { SocketListenEventData } from '@/pages/messenger/model/socket/lib/socket-events.interface';

import { activeConversationApi } from '../../../modules/active-conversation/model/active-conversation.store';

type ReceiveMessageFxParams = {
  data: SocketListenEventData<'from-server:message.new'>;
};

export const receiveMessageFx = createEffect<ReceiveMessageFxParams, void>(
  ({ data }) => {
    activeConversationApi.addMessage(data.message);
  },
);
