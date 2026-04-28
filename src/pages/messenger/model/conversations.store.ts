import { createEvent, createStore, restore, sample } from 'effector';

import { getConversationsFx } from './register-page-side-effects/get-conversations.effect';

export const updateConversations = createEvent();
export const $conversations = restore(getConversationsFx.doneData, []);

export const $isGetConversationsError = createStore(false)
  .on(getConversationsFx.done, () => false)
  .on(getConversationsFx.fail, () => true)
  .reset(getConversationsFx);

sample({
  clock: updateConversations,
  target: getConversationsFx,
});
