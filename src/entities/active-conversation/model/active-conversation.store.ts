import { createApi, createStore } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

type Controller = OperationInfo<'ChatController_getConversationByPublicId_v1'>;
type Response = Controller['response'];

export const $activeConversation = createStore<Response | null>(null);
export const $hasActiveConversation = $activeConversation.map(Boolean);
export const $activeConversationPublicId = $activeConversation.map(
  (conversation) => conversation?.publicId || null,
);
export const $activeConversationParticipantUsers = $activeConversation.map(
  (conversation) =>
    conversation?.participants.map((participant) => participant.user) || null,
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
