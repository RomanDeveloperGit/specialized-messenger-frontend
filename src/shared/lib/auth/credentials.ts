export type Credentials = {
  login: string;
  password: string;
};

export const isValidBase64Credentials = (base64: string) => {
  try {
    atob(base64);

    return true;
  } catch {
    return false;
  }
};

export const convertCredentialsToBase64 = (credentials: Credentials) => {
  return btoa(`${credentials.login}:${credentials.password}`);
};

export const convertBase64ToCredentials = (
  base64: string,
): Credentials | null => {
  const [login, password] = atob(base64).split(':');

  if (!login || !password) {
    return null;
  }

  return {
    login,
    password,
  };
};
