import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUnit } from 'effector-react';
import { IconLink, IconUserPlus, IconX } from '@tabler/icons-react';

import {
  Box,
  Group,
  Modal,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { createInvitationFx } from '../model/create-invitation.effect';
import {
  type CreateInvitationSchema,
  createInvitationSchema,
} from '../model/create-invitation.schema';
import {
  $hasInvitationLink,
  invitationLinkApi,
} from '../model/invitation-link.store';
import { CreateInvitationStep } from './create-invitation-step';
import { InvitationLinkStep } from './invitation-link-step';

export const CreateInvitation = () => {
  const [hasInvitationLink, resetInvitationLink, createInvitation] = useUnit([
    $hasInvitationLink,
    invitationLinkApi.reset,
    createInvitationFx,
  ]);

  const [opened, { open, close }] = useDisclosure(false);

  const methods = useForm<CreateInvitationSchema>({
    resolver: zodResolver(createInvitationSchema),
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = handleSubmit(async (data) => {
    createInvitation({
      body: data,
    });
  });

  const handleClose = () => {
    close();
    reset();
    resetInvitationLink();
  };

  return (
    <>
      <Tooltip label="Создать приглашение" position="bottom" withArrow>
        <UnstyledButton
          p={7}
          onClick={open}
          style={(theme) => ({
            'borderRadius': theme.radius.md,
            'color': theme.colors.dark[2],
            'display': 'flex',
            'alignItems': 'center',
            'transition': 'background 0.15s, color 0.15s',
            '&:hover': {
              background: theme.colors.dark[6],
              color: theme.colors.green[5],
            },
          })}
        >
          <IconLink size={16} stroke={1.7} />
        </UnstyledButton>
      </Tooltip>
      <Modal
        opened={opened}
        onClose={handleClose}
        withCloseButton={false}
        centered
        size={400}
        padding={0}
        radius={16}
        styles={{
          content: {
            background: 'var(--mantine-color-dark-8)',
            border: '1px solid var(--mantine-color-dark-6)',
            overflow: 'hidden',
          },
          overlay: {
            backdropFilter: 'blur(4px)',
          },
        }}
      >
        <Box
          style={{
            background:
              'linear-gradient(135deg, color-mix(in srgb, var(--mantine-color-green-9) 60%, var(--mantine-color-dark-8) 40%) 0%, var(--mantine-color-dark-8) 100%)',
            borderBottom: '1px solid var(--mantine-color-dark-6)',
            padding: '18px 20px 16px',
          }}
        >
          <Group justify="space-between" align="center">
            <Group gap={12} align="center">
              <Box
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background:
                    'linear-gradient(135deg, #2f9e44 0%, #1f7a33 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(47, 158, 68, 0.35)',
                }}
              >
                <IconUserPlus
                  size={17}
                  color="rgba(255,255,255,0.95)"
                  stroke={1.7}
                />
              </Box>
              <Box>
                <Text
                  size="sm"
                  fw={600}
                  c="gray.1"
                  lh={1.2}
                  style={{ letterSpacing: '-0.1px' }}
                >
                  Создать приглашение
                </Text>
                <Text size="xs" c="dark.3" lh={1.2} mt={2}>
                  Персональная ссылка для входа
                </Text>
              </Box>
            </Group>
            <UnstyledButton
              onClick={handleClose}
              p={5}
              style={(theme) => ({
                'borderRadius': theme.radius.sm,
                'color': theme.colors.dark[3],
                'display': 'flex',
                'alignItems': 'center',
                'transition': 'background 0.15s, color 0.15s',
                '&:hover': {
                  background: theme.colors.dark[6],
                  color: theme.colors.gray[4],
                },
              })}
            >
              <IconX size={15} stroke={2} />
            </UnstyledButton>
          </Group>
        </Box>
        <Box p={20}>
          <FormProvider {...methods}>
            <form onSubmit={onSubmit}>
              {hasInvitationLink ? (
                <InvitationLinkStep closeModal={handleClose} />
              ) : (
                <CreateInvitationStep />
              )}
            </form>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
};
