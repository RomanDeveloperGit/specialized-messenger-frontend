import { combine } from 'effector';

import { $activeConversationParticipantUserIds } from '@/entities/active-conversation';
import { $authorizedUserId } from '@/entities/authorized-user';
import { $users } from '@/entities/users';

export const $availableUsers = combine(
  $users,
  $activeConversationParticipantUserIds,
  $authorizedUserId,
  (users, activeConversationParticipantUserIds, authorizedUserId) => {
    const excludeIds = new Set([
      ...activeConversationParticipantUserIds,
      authorizedUserId,
    ]);

    return users.filter((user) => !excludeIds.has(user.id));
  },
);
