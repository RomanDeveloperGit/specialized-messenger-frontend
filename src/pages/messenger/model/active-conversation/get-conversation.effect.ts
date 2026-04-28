import { createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api';
import { showErrorNotificationFx } from '@/shared/lib/show-notification';

type Controller = OperationInfo<'ChatController_getConversationByPublicId_v1'>;
type Path = Controller['path'];
type Response = Controller['response'];

export const getConversationFx = createEffect<{ publicId: string }, Response>(
  async ({ publicId }) => {
    return await authorizedHttpClient
      .get<Response>(`/api/v1/chat/conversations/${publicId}` satisfies Path)
      .json();
  },
);

sample({
  clock: getConversationFx.fail,
  fn: () => ({ message: 'Get conversation error' }),
  target: showErrorNotificationFx,
});
