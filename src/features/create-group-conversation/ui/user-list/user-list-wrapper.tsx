import type { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import { Box, ScrollArea, Stack, Text } from '@mantine/core';

import type { CreateGroupConversationSchema } from '../../model/create-group-conversation.schema';

export const UserListWrapper: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const {
    formState: { errors },
  } = useFormContext<CreateGroupConversationSchema>();

  return (
    <Box>
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
        Участники
      </Text>
      {errors.selectedUserPublicIds && (
        <Text size="xs" c="red.5">
          {errors.selectedUserPublicIds.message}
        </Text>
      )}
      <ScrollArea h={200} scrollbarSize={3}>
        <Stack gap={1}>{children}</Stack>
      </ScrollArea>
    </Box>
  );
};
