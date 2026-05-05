import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUnit } from 'effector-react';

import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';

import { $invitation } from '@/entities/invitation';

import { acceptInvitationFx } from '../model/accept-invitation.effect';
import {
  type AcceptInvitationSchema,
  acceptInvitationSchema,
} from '../model/accept-invitation.schema';

export const AcceptInvitation = () => {
  const [invitation, isAcceptInvitationPending, acceptInvitation] = useUnit([
    $invitation,
    acceptInvitationFx.pending,
    acceptInvitationFx,
  ]);

  const methods = useForm<AcceptInvitationSchema>({
    resolver: zodResolver(acceptInvitationSchema),
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

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
    <FormProvider {...methods}>
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
        </Stack>
      </form>
    </FormProvider>
  );
};
