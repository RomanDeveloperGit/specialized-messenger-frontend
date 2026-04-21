import { getCredentialsFromLocalStorage } from '@/shared/lib/auth';
import { isPathnameInArray } from '@/shared/lib/is-pathname-in-array';
import {
  DEFAULT_PROTECTED_ROUTE_CONFIG,
  DEFAULT_PUBLIC_ROUTE_CONFIG,
  PROTECTED_ROUTE_CONFIGS,
  PUBLIC_ROUTE_CONFIGS,
} from '@/shared/router';

import { baseSignInFx } from '@/entities/auth/model/base-sign-in.effect';

import { showApp } from './is-app-visible.store';

export const startInitialVisitGuard = async () => {
  const isPublicRoute = isPathnameInArray(
    PUBLIC_ROUTE_CONFIGS.map((route) => route.path),
    globalThis.location.pathname,
  );
  const isProtectedRoute = isPathnameInArray(
    PROTECTED_ROUTE_CONFIGS.map((route) => route.path),
    globalThis.location.pathname,
  );

  const credentials = getCredentialsFromLocalStorage();

  const isAuthorized =
    !!credentials &&
    (await baseSignInFx({ requestBody: credentials })
      .then(() => true)
      .catch(() => false));

  if (isAuthorized && !isProtectedRoute) {
    globalThis.history.replaceState(
      {},
      '',
      DEFAULT_PROTECTED_ROUTE_CONFIG.path,
    );
  } else if (!isAuthorized && !isPublicRoute) {
    globalThis.history.replaceState({}, '', DEFAULT_PUBLIC_ROUTE_CONFIG.path);
  }

  showApp();
};
