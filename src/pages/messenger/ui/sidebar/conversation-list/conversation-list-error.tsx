import type { FC } from 'react';

import { useUnit } from 'effector-react';
import { IconRefresh } from '@tabler/icons-react';

import { Box, Button, Stack, Text } from '@mantine/core';

import { getConversationsFx } from '@/entities/conversations';

import { ConversationListWrapper } from './conversation-list-wrapper';

export const ConversationListError: FC = () => {
  const [getConversations] = useUnit([getConversationsFx]);

  const onRetry = () => {
    getConversations();
  };

  return (
    <ConversationListWrapper>
      <Box px={6} py="md">
        <Stack align="center" gap={8}>
          <Text size="sm" c="dark.3" ta="center">
            Не удалось загрузить чаты
          </Text>
          <Button
            variant="subtle"
            color="dark"
            size="xs"
            leftSection={<IconRefresh size={14} />}
            onClick={onRetry}
          >
            Попробовать снова
          </Button>
        </Stack>
      </Box>
    </ConversationListWrapper>
  );
};
