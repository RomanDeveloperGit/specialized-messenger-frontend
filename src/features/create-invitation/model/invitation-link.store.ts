import { createApi, createStore } from 'effector';

export const $invitationLink = createStore<string | null>(null);
export const $hasInvitationLink = $invitationLink.map(Boolean);
export const invitationLinkApi = createApi($invitationLink, {
  set: (_, link: string) => link,
  reset: () => null,
});
