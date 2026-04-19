/* eslint-disable effector/no-watch */

import { getCredentialsFromLocalStorage } from '@/shared/lib/auth';
import { isPathnameInArray } from '@/shared/lib/is-pathname-in-array';
import { DEFAULT_PUBLIC_ROUTE, PUBLIC_ROUTES } from '@/shared/router';

import { signIn, signInFx } from '@/entities/auth/model/sign-in/action';

import { showApp } from './model';

const redirectUnauthorizedUserWithShowApp = () => {
  DEFAULT_PUBLIC_ROUTE.route.open().then(() => showApp());
};

export const registerFirstVisitGuard = () => {
  const isPublicRoute = isPathnameInArray(
    PUBLIC_ROUTES.map((route) => route.path),
    globalThis.location.pathname,
  );

  const credentials = getCredentialsFromLocalStorage();

  if (!credentials && !isPublicRoute) {
    redirectUnauthorizedUserWithShowApp();

    return;
  }

  if (!credentials) {
    return showApp();
  }

  signIn({
    login: credentials.login,
    password: credentials.password,
    isSilentMode: true,
  });

  const doneWatcher = signInFx.done.watch(() => {
    // редирект на дефолтную страницу для авторизованного юзера вшит внутрь эффекта
    showApp();

    doneWatcher.unsubscribe();
  });

  const failWatcher = signInFx.fail.watch(() => {
    if (isPublicRoute) {
      showApp();
    } else {
      redirectUnauthorizedUserWithShowApp();
    }

    failWatcher.unsubscribe();
  });
};
