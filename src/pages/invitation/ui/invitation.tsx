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

import type { ReactPageWithSideEffect } from '@/shared/lib/react-page-with-side-effect';

import { acceptInvitationFx } from '../model/accept-invitation/accept-invitation.effect';
import {
  type AcceptInvitationSchema,
  acceptInvitationSchema,
} from '../model/accept-invitation/accept-invitation.schema';
import { $invitation } from '../model/invitation.store';
import { getInvitationFx } from '../model/register-page-side-effect/get-invitation.effect';
import { registerPageSideEffect } from '../model/register-page-side-effect/register-page-side-effect';

export const InvitationPage: ReactPageWithSideEffect<{ a: 1 }> = () => {
  const [
    isGetInvitationPending,
    isAcceptInvitationPending,
    acceptInvitation,
    invitation,
  ] = useUnit([
    getInvitationFx.pending,
    acceptInvitationFx.pending,
    acceptInvitationFx,
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
    if (!invitation) return;

    acceptInvitation({
      id: invitation.publicId,
      query: {
        firstName: invitation.firstName,
        lastName: invitation.lastName,
      },
      requestBody: {
        login: data.login,
        password: data.password,
      },
    });
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
                  {isGetInvitationPending ? (
                    <Loader size="xs" color="green" />
                  ) : (
                    initials
                  )}
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
                disabled={isAcceptInvitationPending || !invitation}
                error={errors.login?.message}
              />
              <PasswordInput
                {...register('password')}
                label="Пароль"
                placeholder="Придумайте пароль"
                disabled={isAcceptInvitationPending || !invitation}
                error={errors.password?.message}
              />
              <PasswordInput
                {...register('passwordConfirm')}
                label="Подтверждение пароля"
                placeholder="Повторите пароль"
                disabled={isAcceptInvitationPending || !invitation}
                error={errors.passwordConfirm?.message}
              />
              {
                <Button
                  type="submit"
                  fullWidth
                  mt="xs"
                  color="green"
                  loading={isAcceptInvitationPending}
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

InvitationPage.registerPageSideEffect = registerPageSideEffect;
