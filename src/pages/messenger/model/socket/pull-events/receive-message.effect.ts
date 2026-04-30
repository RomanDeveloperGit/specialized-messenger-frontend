import { createEffect } from 'effector';

import type { WSServerToClientEvents } from '@specialized-messenger/api/constants/chat.constants';

import { activeConversationApi } from '../../active-conversation/active-conversation.store';

type ReceiveMessageFxParams = {
  data: Parameters<WSServerToClientEvents['from-server:message.new']>[0];
};

export const receiveMessageFx = createEffect<ReceiveMessageFxParams, void>(
  ({ data }) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    activeConversationApi.addMessage(data.message as any);
  },
);
