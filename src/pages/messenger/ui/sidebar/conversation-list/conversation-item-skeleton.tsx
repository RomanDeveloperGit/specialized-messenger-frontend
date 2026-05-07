import type { FC } from 'react';

import { Box, Group, Skeleton } from '@mantine/core';

export const ConversationItemSkeleton: FC = () => {
  return (
    <Box
      py={9}
      style={(theme) => ({
        borderRadius: theme.radius.md,
        borderLeft: '2.5px solid transparent',
        paddingLeft: 8,
        paddingRight: 8,
      })}
    >
      <Group gap={11} wrap="nowrap">
        <Skeleton circle height={42} style={{ flexShrink: 0 }} />
        <Box flex={1} style={{ minWidth: 0 }}>
          <Group justify="space-between" wrap="nowrap" gap={4} mb={6}>
            <Skeleton height={13} width="45%" radius="sm" />
            <Skeleton
              height={11}
              width="18%"
              radius="sm"
              style={{ flexShrink: 0 }}
            />
          </Group>
          <Skeleton height={11} width="70%" radius="sm" />
        </Box>
      </Group>
    </Box>
  );
};
