import type { FC } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUnit } from 'effector-react';
import { IconMailOpened, IconMessage2 } from '@tabler/icons-react';

import {
  Avatar,
  Badge,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
} from '@mantine/core';

import {
  acceptInvitation as _acceptInvitation,
  acceptInvitationFx,
} from '../model/accept-invitation/action';
import {
  type AcceptInvitationSchema,
  acceptInvitationSchema,
} from '../model/accept-invitation/schema';
import { $invitation } from '../model/invitation';

export const InvitationPage: FC = () => {
  const [isPending, acceptInvitation, invitation] = useUnit([
    acceptInvitationFx.pending,
    _acceptInvitation,
    $invitation,
  ]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AcceptInvitationSchema>({
    resolver: zodResolver(acceptInvitationSchema),
  });

  const onSubmit = handleSubmit((data) => {
    acceptInvitation(data);
  });

  const fullName = [invitation?.firstName, invitation?.lastName]
    .filter(Boolean)
    .join(' ');

  const initials = [invitation?.firstName?.[0], invitation?.lastName?.[0]]
    .filter(Boolean)
    .join('');

  return (
    <Center h="100vh" bg="dark.9" p={10}>
      <Paper w={360} p="xl" radius="lg">
        <Stack gap="lg">
          <Group justify="center" gap={12}>
            <ThemeIcon size={40} radius="md" color="green">
              <IconMessage2 size={22} />
            </ThemeIcon>
            <Text size="xl" fw={500}>
              Приглашение
            </Text>
          </Group>
          <Paper bg="dark.6" p="md" radius="md">
            <Stack gap="xs" align="center">
              <Group gap={8}>
                <ThemeIcon size={16} radius="xl" color="green" variant="light">
                  <IconMailOpened size={10} />
                </ThemeIcon>
                <Text size="xs" c="dimmed">
                  Вас пригласили в систему
                </Text>
              </Group>
              <Group gap={10}>
                <Avatar size={36} radius="xl" color="green">
                  {invitation ? initials : <Loader size="xs" color="green" />}
                </Avatar>
                <Text fw={600} size="md">
                  {fullName}
                </Text>
              </Group>
              <Badge color="green" variant="light" size="sm" radius="sm">
                Новый участник
              </Badge>
            </Stack>
          </Paper>
          <form onSubmit={onSubmit}>
            <Stack gap="sm">
              <TextInput
                {...register('login')}
                label="Логин"
                placeholder="Придумайте логин"
                disabled={isPending || !invitation}
                error={errors.login?.message}
              />
              <PasswordInput
                {...register('password')}
                label="Пароль"
                placeholder="Придумайте пароль"
                disabled={isPending || !invitation}
                error={errors.password?.message}
              />
              <PasswordInput
                {...register('passwordConfirm')}
                label="Подтверждение пароля"
                placeholder="Повторите пароль"
                disabled={isPending || !invitation}
                error={errors.passwordConfirm?.message}
              />
              {
                <Button
                  type="submit"
                  fullWidth
                  mt="xs"
                  color="green"
                  loading={isPending}
                  disabled={!invitation}
                >
                  Принять приглашение
                </Button>
              }
            </Stack>
          </form>
        </Stack>
      </Paper>
    </Center>
  );
};
