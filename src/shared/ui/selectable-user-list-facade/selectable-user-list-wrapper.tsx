import type { FC } from 'react';

import { Box, ScrollArea, Stack, Text } from '@mantine/core';

export const SelectableUserListWrapper: FC<{
  children: React.ReactNode;
  slot?: React.ReactNode;
}> = ({ children, slot }) => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        flex: 1,
      }}
    >
      <Text
        size="11px"
        fw={500}
        c="dark.3"
        mb={6}
        style={{
          letterSpacing: '0.5px',
          textTransform: 'uppercase',
        }}
      >
        Пользователи
      </Text>
      {slot}
      <ScrollArea h={200} scrollbarSize={6}>
        <Stack gap={1}>{children}</Stack>
      </ScrollArea>
    </Box>
  );
};
