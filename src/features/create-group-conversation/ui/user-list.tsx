import { Controller, useFormContext } from 'react-hook-form';

import { useUnit } from 'effector-react';

import { ErrorText } from '@/shared/ui/error-text';
import { SelectableUserListFacade } from '@/shared/ui/selectable-user-list-facade';

import { $hasUsersError, getUsersFx } from '@/entities/users';

import { $availableUsers } from '../model/available-users';
import type { CreateGroupConversationSchema } from '../model/create-group-conversation.schema';

export const UserList = () => {
  const [isUsersPending, hasUsersError, users, getUsers] = useUnit([
    getUsersFx.pending,
    $hasUsersError,
    $availableUsers,
    getUsersFx,
  ]);

  const { setValue, control } = useFormContext<CreateGroupConversationSchema>();

  const handleChange = (newSelectedUserPublicIds: string[]) => {
    setValue('selectedUserPublicIds', newSelectedUserPublicIds, {
      shouldValidate: true,
    });
  };

  return (
    <Controller
      control={control}
      name="selectedUserPublicIds"
      render={({ field, fieldState: { error } }) => (
        <SelectableUserListFacade
          list={users}
          selectedListPublicIds={field.value}
          isPending={isUsersPending}
          hasError={hasUsersError}
          onRetry={getUsers}
          onChange={handleChange}
          listSlot={error && <ErrorText>{error.message}</ErrorText>}
        />
      )}
    />
  );
};
