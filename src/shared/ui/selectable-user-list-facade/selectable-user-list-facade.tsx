import type { FC } from 'react';

import type { Dto } from '@specialized-messenger/api/specs';

import { SelectableUserList } from './selectable-user-list';
import { SelectableUserListEmpty } from './selectable-user-list-empty';
import { SelectableUserListError } from './selectable-user-list-error';
import { SelectableUserListLoader } from './selectable-user-list-loader';

export const SelectableUserListFacade: FC<{
  list: Dto['User'][];
  selectedListPublicIds: string[];
  isPending: boolean;
  hasError: boolean;
  onRetry: () => void;
  onChange: (newSelectedListPublicIds: string[]) => void;
  listSlot?: React.ReactNode;
}> = ({
  list,
  selectedListPublicIds,
  isPending,
  hasError,
  onRetry,
  onChange,
  listSlot,
}) => {
  switch (true) {
    case isPending:
      return <SelectableUserListLoader />;
    case hasError:
      return <SelectableUserListError onRetry={onRetry} />;
    case !list.length:
      return <SelectableUserListEmpty />;
    default:
      return (
        <SelectableUserList
          data={list}
          selectedPublicIds={selectedListPublicIds}
          onChange={onChange}
          slot={listSlot}
        />
      );
  }
};
