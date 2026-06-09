import { useUnit } from 'effector-react';

import { $users } from '@/entities/users';

import { UserItem } from './user-item';
import { UserListWrapper } from './user-list-wrapper';

export const UserList = () => {
  const [users] = useUnit([$users]);

  return (
    <UserListWrapper>
      {users.map((user) => (
        <UserItem user={user} key={user.id} />
      ))}
    </UserListWrapper>
  );
};
