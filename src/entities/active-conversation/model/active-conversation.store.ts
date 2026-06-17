import { createApi, createStore } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

type Controller = OperationInfo<'ChatController_getConversationByPublicId_v1'>;
type Response = Controller['response'];

export const $activeConversation = createStore<Response | null>(null);
export const $hasActiveConversation = $activeConversation.map(Boolean);
export const $activeConversationPublicId = $activeConversation.map(
  (conversation) => conversation?.publicId || null,
);
export const $activeConversationParticipants = $activeConversation.map(
  (conversation) => conversation?.participants || null,
);
export const $activeConversationParticipantUserIds = $activeConversation.map(
  (conversation) =>
    conversation?.participants.map((participant) => participant.user.id) ||
    null,
);
export const $activeConversationOwnerUserId =
  $activeConversationParticipants.map(
    (participants) =>
      participants?.find((participant) => participant.role.name === 'OWNER')
        ?.user.id || null,
  );

export const activeConversationApi = createApi($activeConversation, {
  set: (_, conversation: Response) => conversation,
  addMessage: (conversation, message: Response['messages'][number]) => {
    if (!conversation) return conversation;

    return {
      ...conversation,
      messages: [...conversation.messages, message],
    };
  },
  updateParticipantUser: (
    conversation,
    user: Response['participants'][number]['user'],
  ) => {
    if (!conversation) return conversation;

    return {
      ...conversation,
      participants: conversation.participants.map((participant) => {
        if (participant.user.id === user.id) {
          return {
            ...participant,
            user,
          };
        }

        return participant;
      }),
    };
  },
  reset: () => null,
});
