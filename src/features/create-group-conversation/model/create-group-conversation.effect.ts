import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api/http';
import {
  showDefaultErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification/show-notification';

type Controller = OperationInfo<'ChatController_createConversation_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

type CreateGroupConversationFxParams = {
  body: Omit<Body, 'type'>;
};

type CreateGroupConversationFxResult = {
  conversation: Response;
};

export const createGroupConversationFx = createEffect<
  CreateGroupConversationFxParams,
  CreateGroupConversationFxResult
>(async ({ body }) => {
  try {
    const conversation = await authorizedHttpClient
      .post<Response>(`/api/v1/chat/conversations` satisfies Path, {
        json: {
          ...body,
          type: 'GROUP' as never, // из-за типизации спеки
        } satisfies Body,
      })
      .json();

    showSuccessNotificationFx({ message: 'Вы успешно создали чат' });

    return { conversation };
  } catch (error) {
    showDefaultErrorNotificationFx({ type: 'tryAgain' });

    throw error;
  }
});
