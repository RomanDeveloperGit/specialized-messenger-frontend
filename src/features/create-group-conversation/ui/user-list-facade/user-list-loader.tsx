import { Box, Group, Skeleton } from '@mantine/core';

import { UserListWrapper } from './user-list-wrapper';

export const UserListLoader = () => {
  return (
    <UserListWrapper>
      {Array.from({ length: 5 }).map((_, index) => (
        <Box
          py={7}
          style={{
            paddingLeft: 8,
            paddingRight: 8,
            borderRadius: 8,
          }}
          key={index}
        >
          <Group gap={10} wrap="nowrap">
            <Skeleton circle height={32} style={{ flexShrink: 0 }} />
            <Box flex={1} style={{ minWidth: 0 }}>
              <Skeleton height={12} width="50%" radius="sm" mb={5} />
              <Skeleton height={10} width="35%" radius="sm" />
            </Box>
            <Skeleton circle height={18} width={18} style={{ flexShrink: 0 }} />
          </Group>
        </Box>
      ))}
    </UserListWrapper>
  );
};
