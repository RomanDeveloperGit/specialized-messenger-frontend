import type { FC } from 'react';

import type { Dto } from '@specialized-messenger/api/specs';

import { SelectableUserItem } from './selectable-user-item';
import { SelectableUserListWrapper } from './selectable-user-list-wrapper';

export const SelectableUserList: FC<{
  data: Dto['User'][];
  selectedPublicIds: string[];
  slot?: React.ReactNode;
  onChange: (newSelectedListIds: string[]) => void;
}> = ({ data: users, selectedPublicIds, slot, onChange }) => {
  const handleSelect = (user: Dto['User'], isSelected: boolean) => {
    onChange(
      isSelected
        ? [...selectedPublicIds, user.publicId]
        : selectedPublicIds.filter(
            (selectedPublicId) => selectedPublicId !== user.publicId,
          ),
    );
  };

  return (
    <SelectableUserListWrapper slot={slot}>
      {users.map((user) => {
        const isSelected = selectedPublicIds.includes(user.publicId);

        return (
          <SelectableUserItem
            user={user}
            isSelected={isSelected}
            onSelect={handleSelect}
            key={user.id}
          />
        );
      })}
    </SelectableUserListWrapper>
  );
};
