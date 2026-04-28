import { chainRoute } from 'atomic-router';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { invitationRouteConfig } from '@/shared/router';

import { getInvitationFx } from './get-invitation.effect';

type Controller = OperationInfo<'InvitationController_getByPublicId_v1'>;
type Query = Controller['search'];

export const registerPageSideEffects = () => {
  chainRoute({
    route: invitationRouteConfig.route,
    beforeOpen: {
      effect: getInvitationFx,
      mapParams: ({ params, query }) => ({
        id: params.id,
        query: query as Query,
      }),
    },
  });
};
