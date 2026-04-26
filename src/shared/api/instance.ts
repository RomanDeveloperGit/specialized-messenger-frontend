import ky from 'ky';

import { addAuthHeader } from './add-auth-header';

export const unauthorizedApi = ky.create({
  retry: 3,
});

export const authorizedApi = unauthorizedApi.extend({
  hooks: {
    beforeRequest: [addAuthHeader],
  },
});
