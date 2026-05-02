import type { FC } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUnit } from 'effector-react';

import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';

import type { Dto } from '@specialized-messenger/api/specs';

import { acceptInvitationFx } from '../model/accept-invitation.effect';
import {
  type AcceptInvitationSchema,
  acceptInvitationSchema,
} from '../model/accept-invitation.schema';

export const InvitationAcceptance: FC<{
  invitation: Dto['Invitation'];
}> = ({ invitation }) => {
  const [isInvitationAcceptancePending, acceptInvitation] = useUnit([
    acceptInvitationFx.pending,
    acceptInvitationFx,
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
      body: {
        login: data.login,
        password: data.password,
      },
    });
  });

  return (
    <form onSubmit={onSubmit}>
      <Stack gap="sm">
        <TextInput
          {...register('login')}
          label="Логин"
          placeholder="Придумайте логин"
          disabled={isInvitationAcceptancePending}
          error={errors.login?.message}
        />
        <PasswordInput
          {...register('password')}
          label="Пароль"
          placeholder="Придумайте пароль"
          disabled={isInvitationAcceptancePending}
          error={errors.password?.message}
        />
        <PasswordInput
          {...register('passwordConfirm')}
          label="Подтверждение пароля"
          placeholder="Повторите пароль"
          disabled={isInvitationAcceptancePending}
          error={errors.passwordConfirm?.message}
        />
        <Button
          type="submit"
          fullWidth
          mt="xs"
          color="green"
          loading={isInvitationAcceptancePending}
        >
          Принять приглашение
        </Button>
      </Stack>
    </form>
  );
};
