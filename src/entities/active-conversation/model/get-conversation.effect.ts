import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api/http';
import { showDefaultErrorNotificationFx } from '@/shared/lib/show-notification/show-notification';

import { activeConversationApi } from './active-conversation.store';

type Controller = OperationInfo<'ChatController_getConversationByPublicId_v1'>;
type Path = Controller['path'];
type Response = Controller['response'];

type GetConversationFxParams = {
  publicId: string;
  abortController?: AbortController;
};

type GetConversationFxResult = {
  conversation: Response;
};

export const getConversationFx = createEffect<
  GetConversationFxParams,
  GetConversationFxResult
>(async ({ publicId, abortController }) => {
  try {
    const conversation = await authorizedHttpClient
      .get<Response>(`/api/v1/chat/conversations/${publicId}` satisfies Path, {
        signal: abortController?.signal,
      })
      .json();

    activeConversationApi.set(conversation);

    return { conversation };
  } catch (error) {
    if (!(error instanceof DOMException && error.name === 'AbortError')) {
      showDefaultErrorNotificationFx({ type: 'somethingWentWrong' });
    }

    throw error;
  }
});
