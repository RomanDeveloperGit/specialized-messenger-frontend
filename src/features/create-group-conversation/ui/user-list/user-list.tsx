import { useUnit } from 'effector-react';

import { Text } from '@mantine/core';

import { $hasUsersError, $users, getUsersFx } from '@/entities/users';

import { UserItem } from './user-item';
import { UserItemSkeleton } from './user-item-skeleton';
import { UserListError } from './user-list-error';
import { UserListWrapper } from './user-list-wrapper';

export const UserList = () => {
  const [isUsersPending, hasUsersError, users] = useUnit([
    getUsersFx.pending,
    $hasUsersError,
    $users,
  ]);

  switch (true) {
    case isUsersPending:
      return (
        <UserListWrapper>
          {Array.from({ length: 5 }).map((_, index) => (
            <UserItemSkeleton key={index} />
          ))}
        </UserListWrapper>
      );
    case hasUsersError:
      return (
        <UserListWrapper>
          <UserListError />
        </UserListWrapper>
      );
    case !users.length:
      return (
        <Text size="sm" c="dark.3" ta="center" py="lg">
          Пользователи не найдены
        </Text>
      );
    default:
      return (
        <UserListWrapper>
          {users.map((user) => (
            <UserItem user={user} key={user.id} />
          ))}
        </UserListWrapper>
      );
  }
};
