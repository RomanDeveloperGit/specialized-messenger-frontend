import { useUnit } from 'effector-react';

import { Box, ScrollArea, Stack, Text } from '@mantine/core';

import { $conversations } from '../../../../entities/conversations/model/conversations.store';
import { ConversationItem } from './conversation-item';

export const ConversationList = () => {
  const [conversations] = useUnit([$conversations]);

  return (
    <Box>
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
      <ScrollArea flex={1} scrollbarSize={3}>
        <Stack gap={1} px={6} pb="xs">
          {conversations.map((conversation) => (
            <ConversationItem
              conversation={conversation}
              key={conversation.id}
            />
          ))}
        </Stack>
      </ScrollArea>
    </Box>
  );
};
