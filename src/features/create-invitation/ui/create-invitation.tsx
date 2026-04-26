import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUnit } from 'effector-react';
import {
  IconCheck,
  IconCopy,
  IconLink,
  IconUserPlus,
  IconX,
} from '@tabler/icons-react';

import {
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useClipboard, useDisclosure } from '@mantine/hooks';

import { getUserFullName } from '@/shared/lib/get-user-full-name';

import { createInvitationLink } from '../lib/create-invitation-link';
import {
  type CreateInvitationSchema,
  createInvitationSchema,
} from '../model/create-invitation.schema';
import { createInvitationFx } from '../model/create-invitation.store';

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

export const CreateInvitation = () => {
  const [inviteLink, setInviteLink] = useState<string | null>(null);

  const [opened, { open, close }] = useDisclosure(false);
  const clipboard = useClipboard({ timeout: 2000 });

  const [createInvitation, isCreateInvitationPending] = useUnit([
    createInvitationFx,
    createInvitationFx.pending,
  ]);

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    reset,
  } = useForm<CreateInvitationSchema>({
    resolver: zodResolver(createInvitationSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      const invitation = await createInvitation({
        requestBody: data,
      });

      setInviteLink(createInvitationLink(invitation));
    } catch (error) {
      console.error(error);
    }
  });

  const handleClose = () => {
    close();
    reset();
    setInviteLink(null);
  };

  const handleCreateAnother = () => {
    reset();
    setInviteLink(null);
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
          {!inviteLink ? (
            <form onSubmit={onSubmit}>
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
                    background:
                      'linear-gradient(135deg, #2f9e44 0%, #1f7a33 100%)',
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
            </form>
          ) : (
            <Stack gap={0}>
              <Box
                mb={16}
                p={12}
                style={{
                  background:
                    'color-mix(in srgb, var(--mantine-color-green-9) 35%, transparent)',
                  border:
                    '1px solid color-mix(in srgb, var(--mantine-color-green-8) 50%, transparent)',
                  borderRadius: 10,
                }}
              >
                <Group gap={8} align="center">
                  <Box
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: 'var(--mantine-color-green-8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <IconCheck size={11} color="white" stroke={3} />
                  </Box>
                  <Text size="xs" c="green.4" fw={500}>
                    Приглашение создано для{' '}
                    <Text component="span" c="green.3" fw={600}>
                      {getUserFullName(getValues())}
                    </Text>
                  </Text>
                </Group>
              </Box>

              <Text
                size="11px"
                fw={500}
                c="dark.3"
                mb={6}
                style={{ letterSpacing: '0.5px', textTransform: 'uppercase' }}
              >
                Ссылка для приглашения
              </Text>
              <Box
                style={{
                  background: 'var(--mantine-color-dark-9)',
                  border: '1px solid var(--mantine-color-dark-5)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  overflow: 'hidden',
                }}
              >
                <Text
                  size="xs"
                  c="gray.4"
                  flex={1}
                  px={12}
                  py={11}
                  style={{
                    minWidth: 0,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontFamily: 'monospace',
                    fontSize: 12,
                    letterSpacing: '0.3px',
                  }}
                >
                  {inviteLink}
                </Text>

                <Tooltip
                  label={clipboard.copied ? 'Скопировано!' : 'Скопировать'}
                  position="top"
                  withArrow
                >
                  <UnstyledButton
                    onClick={() => clipboard.copy(inviteLink)}
                    px={12}
                    style={{
                      minHeight: 42,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      borderLeft: '1px solid var(--mantine-color-dark-5)',
                      color: clipboard.copied
                        ? 'var(--mantine-color-green-5)'
                        : 'var(--mantine-color-dark-2)',
                      background: clipboard.copied
                        ? 'color-mix(in srgb, var(--mantine-color-green-9) 25%, transparent)'
                        : 'transparent',
                      transition: 'background 0.15s, color 0.15s',
                    }}
                  >
                    {clipboard.copied ? (
                      <IconCheck size={15} stroke={2.5} />
                    ) : (
                      <IconCopy size={15} stroke={1.7} />
                    )}
                  </UnstyledButton>
                </Tooltip>
              </Box>

              <Group gap={8} justify="flex-end" mt={16}>
                <Button
                  variant="subtle"
                  size="xs"
                  radius={8}
                  onClick={handleCreateAnother}
                  styles={{
                    root: {
                      'color': 'var(--mantine-color-dark-2)',
                      'fontSize': 12,
                      '&:hover': {
                        background: 'var(--mantine-color-dark-7)',
                        color: 'var(--mantine-color-gray-3)',
                      },
                    },
                  }}
                >
                  Создать ещё
                </Button>
                <Button
                  size="xs"
                  radius={8}
                  onClick={handleClose}
                  style={{
                    background:
                      'linear-gradient(135deg, #2f9e44 0%, #1f7a33 100%)',
                    fontSize: 12,
                    fontWeight: 600,
                    border: 'none',
                    paddingLeft: 14,
                    paddingRight: 14,
                  }}
                >
                  Готово
                </Button>
              </Group>
            </Stack>
          )}
        </Box>
      </Modal>
    </>
  );
};
