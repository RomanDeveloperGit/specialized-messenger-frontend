import { sample } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { invitationRouteConfig } from '@/shared/router';

import { getInvitationFx } from '@/entities/invitation';

type Controller = OperationInfo<'InvitationController_getByPublicId_v1'>;
type Query = Controller['search'];

export const registerPageSideEffects = () => {
  sample({
    clock: invitationRouteConfig.route.opened,
    fn: (clock) => ({ id: clock.params.id, query: clock.query as Query }),
    target: getInvitationFx,
  });
};
