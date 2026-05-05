import { useFormContext } from 'react-hook-form';

import { useUnit } from 'effector-react';

import { Button, Stack, TextInput } from '@mantine/core';

import { createInvitationFx } from '../model/create-invitation.effect';
import { type CreateInvitationSchema } from '../model/create-invitation.schema';

const inputStyles = {
  label: {
    fontSize: 11,
    fontWeight: 500,
    color: 'var(--mantine-color-dark-3)',
    letterSpacing: '0.5px',
    textTransform: 'uppercase' as const,
    marginBottom: 6,
  },
  input: {
    'background': 'var(--mantine-color-dark-9)',
    'border': '1px solid var(--mantine-color-dark-5)',
    'borderRadius': 10,
    'color': 'var(--mantine-color-gray-1)',
    'fontSize': 14,
    'height': 42,
    'transition': 'border-color 0.15s',
    '&:focus': {
      borderColor: 'var(--mantine-color-green-7)',
    },
    '&::placeholder': {
      color: 'var(--mantine-color-dark-4)',
    },
  },
};

export const CreateInvitationStep = () => {
  const [isCreateInvitationPending] = useUnit([createInvitationFx.pending]);

  const {
    register,
    formState: { errors },
  } = useFormContext<CreateInvitationSchema>();

  return (
    <Stack gap={16}>
      <Stack gap={10}>
        <TextInput
          {...register('lastName')}
          label="Фамилия"
          placeholder="Фамилия"
          disabled={isCreateInvitationPending}
          error={errors.lastName?.message}
          styles={inputStyles}
        />
        <TextInput
          {...register('firstName')}
          label="Имя"
          placeholder="Имя"
          disabled={isCreateInvitationPending}
          error={errors.firstName?.message}
          styles={inputStyles}
        />
      </Stack>
      <Button
        type="submit"
        fullWidth
        h={42}
        radius={10}
        loading={isCreateInvitationPending}
        style={{
          background: 'linear-gradient(135deg, #2f9e44 0%, #1f7a33 100%)',
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.2px',
          border: 'none',
          transition: 'opacity 0.2s, transform 0.1s',
        }}
      >
        Создать приглашение
      </Button>
    </Stack>
  );
};
