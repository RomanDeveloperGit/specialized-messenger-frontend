import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api';

import {
  conversationsApi,
  hasConversationsErrorApi,
} from './conversations.store';

type Controller = OperationInfo<'ChatController_getConversations_v1'>;
type Path = Controller['path'];
type Response = Controller['response'];

type GetConversationsFxResult = {
  conversations: Response;
};

export const getConversationsFx = createEffect<void, GetConversationsFxResult>(
  async () => {
    try {
      hasConversationsErrorApi.reset();

      const conversations = await authorizedHttpClient
        .get<Response>(`/api/v1/chat/conversations` satisfies Path)
        .json();

      conversationsApi.set(conversations);

      return { conversations };
    } catch (error) {
      hasConversationsErrorApi.set(true);

      throw error;
    }
  },
);
