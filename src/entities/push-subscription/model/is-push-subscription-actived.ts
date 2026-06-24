import { createApi, createStore } from 'effector';

export const $isPushSubscriptionActived = createStore(false);

export const isPushSubscriptionActivedApi = createApi(
  $isPushSubscriptionActived,
  {
    init: () => true,
    reset: () => false,
  },
);
