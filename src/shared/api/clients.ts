import ky from 'ky';

import { addAuthHeader } from './add-auth-header';

export const unauthorizedHttpClient = ky.create({
  retry: 3,
});

export const authorizedHttpClient = unauthorizedHttpClient.extend({
  hooks: {
    beforeRequest: [addAuthHeader],
  },
});
