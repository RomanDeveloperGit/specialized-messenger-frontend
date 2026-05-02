import { createApi, createStore } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

type Controller = OperationInfo<'ChatController_getConversations_v1'>;
type Response = Controller['response'];

export const $conversations = createStore<Response>([]);
export const $conversationsCount = $conversations.map(
  (conversations) => conversations.length,
);
export const conversationsApi = createApi($conversations, {
  set: (_, conversations: Response) => conversations,
  reset: () => [],
});

export const $hasConversationsError = createStore(false);
export const hasConversationsErrorApi = createApi($hasConversationsError, {
  init: () => true,
  reset: () => false,
});
