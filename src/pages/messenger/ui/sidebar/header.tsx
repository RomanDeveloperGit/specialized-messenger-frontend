import { useUnit } from 'effector-react';
import { IconMessage2 } from '@tabler/icons-react';

import { Box, Group, Text } from '@mantine/core';

import { $isAuthorizedUserAdmin } from '@/entities/auth/model';

import { $conversationsCount } from '../../model/conversations/conversations.store';
import { CreateConversation } from './create-conversation';
import { CreateInvitation } from './create-invitation';

export const Header = () => {
  const [conversationsCount, isAuthorizedUserAdmin] = useUnit([
    $conversationsCount,
    $isAuthorizedUserAdmin,
  ]);

  return (
    <Box
      h={60}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 7px 0 14px',
        alignItems: 'center',
        borderBottom: '1px solid var(--mantine-color-dark-6)',
        background:
          'linear-gradient(180deg, var(--mantine-color-dark-7) 0%, var(--mantine-color-dark-8) 100%)',
      }}
    >
      <Group style={{ flex: 1 }} justify="space-between">
        <Group gap={10} align="center">
          <Box
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #2f9e44 0%, #1f7a33 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 8px rgba(47, 158, 68, 0.35)',
            }}
          >
            <IconMessage2 size={17} color="#fff" stroke={1.8} />
          </Box>
          <Box>
            <Text size="sm" fw={600} c="gray.1" lh={1.2}>
              Мессенджер
            </Text>
            <Text size="xs" c="dark.3" lh={1.2}>
              {conversationsCount} чатов
            </Text>
          </Box>
        </Group>
        <Group gap={2}>
          {isAuthorizedUserAdmin && <CreateInvitation />}
          {isAuthorizedUserAdmin && <CreateConversation />}
        </Group>
      </Group>
    </Box>
  );
};
