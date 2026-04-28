import { createEffect, sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { authorizedHttpClient } from '@/shared/api';
import { showErrorNotificationFx } from '@/shared/lib/show-notification';

type Controller = OperationInfo<'ChatController_getConversations_v1'>;
type Path = Controller['path'];
type Response = Controller['response'];

export const getConversationsFx = createEffect<void, Response>(async () => {
  return await authorizedHttpClient
    .get<Response>(`/api/v1/chat/conversations` satisfies Path)
    .json();
});

sample({
  clock: getConversationsFx.fail,
  fn: () => ({ message: 'Get conversations error' }),
  target: showErrorNotificationFx,
});
