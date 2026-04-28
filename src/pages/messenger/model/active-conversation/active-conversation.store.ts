import { attach, combine, createEvent, createStore, sample } from 'effector';

import type {
  WSClientToServerEvents,
  WSServerToClientEvents,
} from '@specialized-messenger/api/constants/chat.constants';
import type { OperationInfo } from '@specialized-messenger/api/specs';

import { $conversations } from '../conversations.store';
import {
  $socket,
  joinConversationFx,
  leaveConversationFx,
  sendMessageFx,
} from '../register-page-side-effects/socket.store';
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

export const receiveMessage =
  createEvent<
    Parameters<WSServerToClientEvents['from-server:message.new']>[0]
  >();

$activeConversation.on(receiveMessage, (state, { message }) => {
  if (!state) return state;

  return {
    ...state,
    messages: [...state.messages, message],
  } as typeof state;
});

const attachedJoinConversationFx = attach({
  effect: joinConversationFx,
});

const attachedLeaveConversationFx = attach({
  effect: leaveConversationFx,
});

export const attachedSendMessageFx = attach({
  effect: sendMessageFx,
});

sample({
  clock: setActiveConversationByPublicId,
  source: $socket,
  fn: (source) => ({ socket: source!, data: undefined }),
  target: attachedLeaveConversationFx,
});

const $joinPayloadStore = combine(
  $socket,
  $activeConversation,
  (socket, conversation) => {
    return {
      socket: socket!,
      data: {
        conversationId: (conversation || {}).publicId!,
      },
    };
  },
);

sample({
  clock: attachedLeaveConversationFx.done,
  source: $joinPayloadStore,
  target: attachedJoinConversationFx,
});

export const sendMessage =
  createEvent<
    Parameters<WSClientToServerEvents['from-client:message.new']>[0]
  >();

sample({
  clock: sendMessage,
  source: $socket,
  fn: (source, clock) => ({ socket: source!, data: clock }),
  target: attachedSendMessageFx,
});
