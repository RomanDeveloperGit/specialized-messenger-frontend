import { createEffect } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api/http';
import {
  showDefaultErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification/show-notification';

type Controller =
  OperationInfo<'ChatController_removeConversationParticipant_v1'>;
type Path = Controller['path'];
type Response = Controller['response'];

type RemoveConversationParticipantFxParams = {
  conversationPublicId: string;
  participantPublicId: string;
};

type RemoveConversationParticipantFxResult = {
  conversation: Response;
};

export const removeConversationParticipantFx = createEffect<
  RemoveConversationParticipantFxParams,
  RemoveConversationParticipantFxResult
>(async ({ conversationPublicId, participantPublicId }) => {
  try {
    const conversation = await authorizedHttpClient
      .delete<Response>(
        `/api/v1/chat/conversations/${conversationPublicId}/participants/${participantPublicId}` satisfies Path,
      )
      .json();

    showSuccessNotificationFx({ message: 'Участник успешно удален' });

    return { conversation };
  } catch (error) {
    showDefaultErrorNotificationFx({ type: 'tryAgain' });

    throw error;
  }
});
