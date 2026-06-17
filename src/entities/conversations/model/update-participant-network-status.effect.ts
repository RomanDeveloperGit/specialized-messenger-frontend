import { createEffect, sample } from 'effector';

import type { SocketListenEventData } from '@/shared/api/socket';
import { userOffline, userOnline } from '@/shared/api/socket';

import { conversationsApi } from './conversations.store';

type UpdateParticipantNetworkStatusFxParams = {
  data:
    | SocketListenEventData<'from-server:user.online'>
    | SocketListenEventData<'from-server:user.offline'>;
};

export const updateParticipantNetworkStatusFx = createEffect<
  UpdateParticipantNetworkStatusFxParams,
  void
>(({ data }) => {
  conversationsApi.updateParticipantUser(data.user);
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
