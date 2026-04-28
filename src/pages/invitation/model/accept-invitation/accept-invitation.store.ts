import { createApi, createStore } from 'effector';

export const $isInvitationAcceptancePending = createStore<boolean>(false);

export const isInvitationAcceptancePendingApi = createApi(
  $isInvitationAcceptancePending,
  {
    set: (_, isPending: boolean) => isPending,
    reset: () => false,
  },
);
