import { createEvent, createStore, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { $conversations } from '../conversations.store';
import { getConversationFx } from './get-conversation.effect';

type Controller = OperationInfo<'ChatController_getConversationByPublicId_v1'>;
type Response = Controller['response'];

export const setActiveConversationByPublicId = createEvent<string>();
export const resetActiveConversation = createEvent();
export const $activeConversation = createStore<Response | null>(null).reset(
  resetActiveConversation,
);

sample({
  clock: setActiveConversationByPublicId,
  source: $conversations,
  fn: (conversations, publicId) => {
    const conversation = conversations.find((c) => c.publicId === publicId);

    return conversation || null;
  },
  target: $activeConversation,
});

sample({
  clock: setActiveConversationByPublicId,
  source: $activeConversation,
  fn: (_, clock) => ({ publicId: clock }),
  target: getConversationFx,
});

sample({
  clock: getConversationFx.doneData,
  target: $activeConversation,
});
