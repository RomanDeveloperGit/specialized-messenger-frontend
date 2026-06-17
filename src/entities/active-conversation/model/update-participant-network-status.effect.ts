import { createEffect, sample } from 'effector';

import type { SocketListenEventData } from '@/shared/api/socket';
import { userOffline, userOnline } from '@/shared/api/socket';

import { activeConversationApi } from './active-conversation.store';

type UpdateParticipantNetworkStatusFxParams = {
  data:
    | SocketListenEventData<'from-server:user.online'>
    | SocketListenEventData<'from-server:user.offline'>;
};

const updateParticipantNetworkStatusFx = createEffect<
  UpdateParticipantNetworkStatusFxParams,
  void
>(({ data }) => {
  activeConversationApi.updateParticipantUser(data.user);
});

sample({
  clock: userOnline,
  fn: (clock) => ({ data: clock }),
  target: updateParticipantNetworkStatusFx,
});

sample({
  clock: userOffline,
  fn: (clock) => ({ data: clock }),
  target: updateParticipantNetworkStatusFx,
});
