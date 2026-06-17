import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api/http';
import {
  showDefaultErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification/show-notification';

type Controller =
  OperationInfo<'ChatController_addConversationParticipants_v1'>;
type Path = Controller['path'];
type Body = Controller['body'];
type Response = Controller['response'];

type AddConversationParticipantsFxParams = {
  conversationPublicId: string;
  body: Body;
};

type AddConversationParticipantsFxResult = {
  conversation: Response;
};

export const addConversationParticipantsFx = createEffect<
  AddConversationParticipantsFxParams,
  AddConversationParticipantsFxResult
>(async ({ conversationPublicId, body }) => {
  try {
    const conversation = await authorizedHttpClient
      .post<Response>(
        `/api/v1/chat/conversations/${conversationPublicId}/participants` satisfies Path,
        { json: body satisfies Body },
      )
      .json();

    showSuccessNotificationFx({ message: 'Участник успешно добавлен' });

    return { conversation };
  } catch (error) {
    showDefaultErrorNotificationFx({ type: 'tryAgain' });

    throw error;
  }
});
