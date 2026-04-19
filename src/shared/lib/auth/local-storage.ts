// По возможности в libs надо делать чистые функции, поскольку это shared слой
// Но тут этого не избежать. хотя localStorage - это тоже как shared +-
// [!!!] Будем считать этот файл лишь дополнением (около-бизнесовое) к основному функционалу библиотеки

import {
  convertBase64ToCredentials,
  convertCredentialsToBase64,
  type Credentials,
  isValidBase64Credentials,
} from './credentials';

const LOCAL_STORAGE_CREDENTIALS_KEY = 'credentials';

export const getBase64CredentialsFromLocalStorage = () => {
  return localStorage.getItem(LOCAL_STORAGE_CREDENTIALS_KEY);
};

export const getCredentialsFromLocalStorage = () => {
  const base64 = getBase64CredentialsFromLocalStorage();

  if (!base64) return null;

  if (isValidBase64Credentials(base64)) {
    return convertBase64ToCredentials(base64);
  }

  return null;
};

export const saveCredentialsInLocalStorage = (credentials: Credentials) => {
  localStorage.setItem(
    LOCAL_STORAGE_CREDENTIALS_KEY,
    convertCredentialsToBase64(credentials),
  );
};
