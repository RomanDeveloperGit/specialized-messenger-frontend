import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUnit } from 'effector-react';

import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';

import { acceptInvitationFx } from '../model/accept-invitation/accept-invitation.effect';
import {
  type AcceptInvitationSchema,
  acceptInvitationSchema,
} from '../model/accept-invitation/accept-invitation.schema';
import { $invitation } from '../model/invitation/invitation.store';

export const InvitationAcceptance = () => {
  const [invitation, isInvitationAcceptancePending, acceptInvitation] = useUnit(
    [$invitation, acceptInvitationFx.pending, acceptInvitationFx],
  );

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
          disabled={isInvitationAcceptancePending || !invitation}
          error={errors.login?.message}
        />
        <PasswordInput
          {...register('password')}
          label="Пароль"
          placeholder="Придумайте пароль"
          disabled={isInvitationAcceptancePending || !invitation}
          error={errors.password?.message}
        />
        <PasswordInput
          {...register('passwordConfirm')}
          label="Подтверждение пароля"
          placeholder="Повторите пароль"
          disabled={isInvitationAcceptancePending || !invitation}
          error={errors.passwordConfirm?.message}
        />
        <Button
          type="submit"
          fullWidth
          mt="xs"
          color="green"
          loading={isInvitationAcceptancePending}
          disabled={!invitation}
        >
          Принять приглашение
        </Button>
      </Stack>
    </form>
  );
};
