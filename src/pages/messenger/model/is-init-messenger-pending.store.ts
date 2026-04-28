import { createEvent, createStore } from 'effector';

import { getConversationsFx } from './register-page-side-effects/get-conversations.effect';

export const setIsInitMessengerPending = createEvent<boolean>();
export const $isInitMessengerPending = createStore(false)
  .on(
    setIsInitMessengerPending,
    (_, isInitMessengerPending) => isInitMessengerPending,
  )
  .reset(getConversationsFx.done, getConversationsFx.fail);
