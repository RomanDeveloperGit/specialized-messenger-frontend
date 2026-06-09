import { type FC } from 'react';

import { Box, ScrollArea, Stack, Text } from '@mantine/core';

export const ConversationListWrapper: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
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
        size="xs"
        fw={500}
        c="dark.3"
        px="md"
        pt={4}
        pb={2}
        style={{ letterSpacing: '0.6px', textTransform: 'uppercase' }}
      >
        Чаты
      </Text>
      <ScrollArea flex={1} scrollbarSize={6} scrollHideDelay={0}>
        <Stack gap={1} px={6} pb="xs">
          {children}
        </Stack>
      </ScrollArea>
    </Box>
  );
};
