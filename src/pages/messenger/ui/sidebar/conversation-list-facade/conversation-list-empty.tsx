import type { FC } from 'react';

import { Box, Stack, Text } from '@mantine/core';

import { ConversationListWrapper } from './conversation-list-wrapper';

export const ConversationListEmpty: FC = () => {
  return (
    <ConversationListWrapper>
      <Box px={6} py="md">
        <Stack align="center" gap={8}>
          <Text size="sm" c="dark.3" ta="center">
            Чаты не найдены
          </Text>
        </Stack>
      </Box>
    </ConversationListWrapper>
  );
};
