export const AUTH_HEADER_NAME = 'Authorization';

export const createAuthHeaderValue = (credentialsBase64: string) => {
  return `Basic ${credentialsBase64}`;
};
