import { useUnit } from 'effector-react';

import { $hasUsersError, $users, getUsersFx } from '@/entities/users';

import { UserList } from './user-list';
import { UserListEmpty } from './user-list-empty';
import { UserListError } from './user-list-error';
import { UserListLoader } from './user-list-loader';

export const UserListFacade = () => {
  const [isUsersPending, hasUsersError, users] = useUnit([
    getUsersFx.pending,
    $hasUsersError,
    $users,
  ]);

  switch (true) {
    case isUsersPending:
      return <UserListLoader />;
    case hasUsersError:
      return <UserListError />;
    case !users.length:
      return <UserListEmpty />;
    default:
      return <UserList />;
  }
};
