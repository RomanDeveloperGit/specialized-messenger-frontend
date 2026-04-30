import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api';
import {
  showDefaultErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification';

type Controller = OperationInfo<'ChatController_createConversation_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

type CreateConversationFxParams = {
  body: Body;
};

type CreateConversationFxResult = {
  conversation: Response;
};

export const createConversationFx = createEffect<
  CreateConversationFxParams,
  CreateConversationFxResult
>(async ({ body }) => {
  try {
    const conversation = await authorizedHttpClient
      .post<Response>(`/api/v1/chat/conversations` satisfies Path, {
        json: body,
      })
      .json();

    showSuccessNotificationFx({ message: 'Вы успешно создали чат' });

    return { conversation };
  } catch (error) {
    showDefaultErrorNotificationFx({ type: 'tryAgain' });

    throw error;
  }
});
