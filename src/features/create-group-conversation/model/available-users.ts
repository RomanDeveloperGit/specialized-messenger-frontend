import { combine } from 'effector';

import { $authorizedUserId } from '@/entities/authorized-user';
import { $users } from '@/entities/users';

export const $availableUsers = combine(
  $users,
  $authorizedUserId,
  (users, authorizedUserId) =>
    users.filter((user) => user.id !== authorizedUserId),
);
