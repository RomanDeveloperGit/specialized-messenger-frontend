import { createEffect, type EffectParams } from 'effector';

import type { OperationInfo } from '@specialized-messenger/api/specs';

import { unauthorizedHttpClient } from '@/shared/api';
import {
  showDefaultErrorNotificationFx,
  showErrorNotificationFx,
  showSuccessNotificationFx,
} from '@/shared/lib/show-notification';
import {
  DEFAULT_PROTECTED_ROUTE_CONFIG,
  DEFAULT_PUBLIC_ROUTE_CONFIG,
  getRouteByConfig,
} from '@/shared/router';

import { signInFx as rawSignInFx } from '@/entities/auth/model';

import { invitationApi } from '../invitation/invitation.store';

type Controller = OperationInfo<'InvitationController_acceptByPublicId_v1'>;
type Path = Controller['path'];
type Query = Controller['search'];
type Body = Controller['body'];
type Response = Controller['response'];

type AcceptInvitationFxParams = {
  id: string;
  query: Query;
  body: Body;
};

const ACCEPT_INVITATION_ERROR = 'ACCEPT_INVITATION_ERROR';
const SIGN_IN_ERROR = 'SIGN_IN_ERROR';

const acceptInvitationWithStaticErrorFx = createEffect<
  AcceptInvitationFxParams,
  void
>(async ({ id, query, body }) => {
  try {
    await unauthorizedHttpClient.post<Response>(
      `/api/v1/invitations/${id}/accept` satisfies Path,
      {
        searchParams: query,
        json: body,
      },
    );
  } catch {
    throw new Error(ACCEPT_INVITATION_ERROR);
  }
});

const signInWithStaticErrorFx = createEffect<
  EffectParams<typeof rawSignInFx>,
  void
>(async (params) => {
  try {
    await rawSignInFx(params);
  } catch {
    throw new Error(SIGN_IN_ERROR);
  }
});

export const acceptInvitationFx = createEffect<AcceptInvitationFxParams, void>(
  async (params) => {
    try {
      await acceptInvitationWithStaticErrorFx(params);
      await signInWithStaticErrorFx({ body: params.body });

      getRouteByConfig(DEFAULT_PROTECTED_ROUTE_CONFIG).open();
      showSuccessNotificationFx({
        message: 'Вы успешно приняли приглашение и вошли в аккаунт',
      });

      invitationApi.reset();
    } catch (error) {
      if (error instanceof Error) {
        switch (error.message) {
          case ACCEPT_INVITATION_ERROR:
            showDefaultErrorNotificationFx({ type: 'tryAgain' });

            break;
          case SIGN_IN_ERROR:
            getRouteByConfig(DEFAULT_PUBLIC_ROUTE_CONFIG).open();
            showErrorNotificationFx({
              message: 'Попробуйте войти в аккаунт самостоятельно',
            });

            invitationApi.reset();

            break;
        }
      }

      throw error;
    }
  },
);
