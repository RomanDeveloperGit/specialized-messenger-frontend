import type { FC } from 'react';

import { useUnit } from 'effector-react';
import { IconRefresh } from '@tabler/icons-react';

import { Box, Button, Stack, Text } from '@mantine/core';

import { $authorizedUserId } from '@/entities/auth';
import { getUsersFx } from '@/entities/users';

export const UserListError: FC = () => {
  const [getUsers, authorizedUserId] = useUnit([getUsersFx, $authorizedUserId]);

  const onRetry = () => {
    getUsers({ excludeUserId: authorizedUserId! });
  };

  return (
    <Box py="md">
      <Stack align="center" gap={8}>
        <Text size="xs" c="dark.3" ta="center">
          Не удалось загрузить пользователей
        </Text>
        <Button
          variant="subtle"
          color="dark"
          size="xs"
          leftSection={<IconRefresh size={13} />}
          onClick={onRetry}
          styles={{
            root: {
              'fontSize': 12,
              'color': 'var(--mantine-color-dark-2)',
              '&:hover': {
                background: 'var(--mantine-color-dark-7)',
                color: 'var(--mantine-color-gray-3)',
              },
            },
          }}
        >
          Попробовать снова
        </Button>
      </Stack>
    </Box>
  );
};
