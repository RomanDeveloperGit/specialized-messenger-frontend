import type { BeforeRequestHook } from 'ky';

import {
  AUTH_HEADER_NAME,
  createAuthHeaderValue,
  getBase64CredentialsFromLocalStorage,
} from '@/shared/lib/auth';

export const addAuthHeader: BeforeRequestHook = (state) => {
  const credentials = getBase64CredentialsFromLocalStorage();

  if (credentials) {
    state.request.headers.set(
      AUTH_HEADER_NAME,
      createAuthHeaderValue(credentials),
    );
  }
};
