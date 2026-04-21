import { attach, sample } from 'effector';

import {
  DEFAULT_PROTECTED_ROUTE_CONFIG,
  DEFAULT_PUBLIC_ROUTE_CONFIG,
} from '@/shared/router';

import { baseSignInFx } from '@/entities/auth/model/base-sign-in.effect';

import { showApp } from '../is-app-visible.store';
import { $isInitialVisitToPublicRoute } from './is-initial-visit-to-public-route.store';

export const initialVisitSignInFx = attach({
  effect: baseSignInFx,
});

sample({
  clock: initialVisitSignInFx.done,
  filter: (isInitialVisitToPublicRoute) => !!isInitialVisitToPublicRoute,
  target: [DEFAULT_PROTECTED_ROUTE_CONFIG.route.open, showApp],
});

sample({
  clock: initialVisitSignInFx.done,
  filter: (isInitialVisitToPublicRoute) => !isInitialVisitToPublicRoute,
  target: showApp,
});

sample({
  clock: initialVisitSignInFx.fail,
  source: $isInitialVisitToPublicRoute,
  filter: (isInitialVisitToPublicRoute) => !!isInitialVisitToPublicRoute,
  target: [showApp],
});

sample({
  clock: initialVisitSignInFx.fail,
  source: $isInitialVisitToPublicRoute,
  filter: (isInitialVisitToPublicRoute) => !isInitialVisitToPublicRoute,
  target: [DEFAULT_PUBLIC_ROUTE_CONFIG.route.open, showApp],
});
