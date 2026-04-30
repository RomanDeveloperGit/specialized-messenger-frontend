import { createApi, createStore } from 'effector';

export const $isMessengerPagePending = createStore<boolean>(false);
export const isMessengerPagePendingApi = createApi($isMessengerPagePending, {
  set: (_, isPending: boolean) => isPending,
  reset: () => false,
});
