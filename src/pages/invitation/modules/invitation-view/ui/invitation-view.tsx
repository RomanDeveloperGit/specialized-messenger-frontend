import { useUnit } from 'effector-react';
import { IconMailOpened, IconMessage2 } from '@tabler/icons-react';

import {
  Avatar,
  Badge,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core';

import { getUserFullName } from '@/shared/lib/get-user-full-name';
import { getUserInitials } from '@/shared/lib/get-user-initials';

import { getInvitationFx } from '../model/get-invitation.effect';
import { $hasInvitationError, $invitation } from '../model/invitation.store';
import { InvitationError } from './invitation-error';

export const InvitationView = () => {
  const [invitation, isInvitationPending, hasInvitationError] = useUnit([
    $invitation,
    getInvitationFx.pending,
    $hasInvitationError,
  ]);

  const firstName = invitation?.firstName ?? '';
  const lastName = invitation?.lastName ?? '';
  const fullName = getUserFullName({ firstName, lastName });
  const initials = getUserInitials({ firstName, lastName });

  if (hasInvitationError) return <InvitationError />;

  return (
    <Stack gap="lg">
      <Group justify="center" gap="sm">
        <ThemeIcon size={36} radius="md" color="green">
          <IconMessage2 size={18} />
        </ThemeIcon>
        <Text size="xl" fw={500}>
          Приглашение
        </Text>
      </Group>

      <Paper bg="dark.6" p="md" radius="md">
        <Stack gap="xs" align="center">
          <Group gap="xs">
            <ThemeIcon size={16} radius="xl" color="green" variant="light">
              <IconMailOpened size={8} />
            </ThemeIcon>
            <Text size="xs" c="dimmed">
              Вас пригласили в систему
            </Text>
          </Group>
          <Group gap="xs">
            <Avatar size={36} radius="xl" color="green">
              {isInvitationPending ? (
                <Loader size="xs" color="green" />
              ) : (
                initials
              )}
            </Avatar>
            <Text fw={500} size="lg">
              {fullName}
            </Text>
          </Group>
          <Badge color="green" variant="light" size="sm" radius="sm">
            Новый участник
          </Badge>
        </Stack>
      </Paper>
    </Stack>
  );
};
