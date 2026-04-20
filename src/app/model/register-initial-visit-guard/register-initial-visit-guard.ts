import { getCredentialsFromLocalStorage } from '@/shared/lib/auth';
import { isPathnameInArray } from '@/shared/lib/is-pathname-in-array';
import {
  DEFAULT_PUBLIC_ROUTE_CONFIG,
  PUBLIC_ROUTE_CONFIGS,
} from '@/shared/router';

import { showApp } from '../is-app-visible.store';
import { initialVisitSignInFx } from './initial-visit-sign-in.effect';
import { setIsInitialVisitToPublicRoute } from './is-initial-visit-to-public-route.store';

export const registerInitialVisitGuard = () => {
  const isPublicRoute = isPathnameInArray(
    PUBLIC_ROUTE_CONFIGS.map((route) => route.path),
    globalThis.location.pathname,
  );

  setIsInitialVisitToPublicRoute(isPublicRoute);

  const credentials = getCredentialsFromLocalStorage();

  if (!credentials && !isPublicRoute) {
    DEFAULT_PUBLIC_ROUTE_CONFIG.route.open().then(() => showApp());

    return;
  }

  if (!credentials) {
    return showApp();
  }

  initialVisitSignInFx({
    requestBody: credentials,
  });
};
