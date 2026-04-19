import ky from 'ky';

import { addAuthHeader } from './add-auth-header';

export const api = ky.create({
  retry: 0,
  hooks: {
    beforeRequest: [addAuthHeader],
  },
});
