import { createEffect, sample } from 'effector';

import {
  receiveMessage,
  type SocketListenEventData,
} from '@/shared/api/socket';

import { activeConversationApi } from './active-conversation.store';

type ReceiveMessageFxParams = {
  data: SocketListenEventData<'from-server:message.new'>;
};

const receiveMessageFx = createEffect<ReceiveMessageFxParams, void>(
  ({ data }) => {
    activeConversationApi.addMessage(data.message);
  },
);

sample({
  clock: receiveMessage,
  fn: (data) => ({ data }),
  target: receiveMessageFx,
});
