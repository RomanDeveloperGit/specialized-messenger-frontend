import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUnit } from 'effector-react';
import { IconPencil, IconX } from '@tabler/icons-react';

import {
  Box,
  Button,
  Group,
  Modal,
  ScrollArea,
  Stack,
  Text,
  TextInput,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { $users } from '@/entities/users';

import { createGroupConversationFx } from '../model/create-group-conversation.effect';
import {
  type CreateGroupConversationSchema,
  createGroupConversationSchema,
} from '../model/create-group-conversation.schema';
import { UserItem } from './user-item';

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
    '&:focus': { borderColor: 'var(--mantine-color-green-7)' },
    '&::placeholder': { color: 'var(--mantine-color-dark-4)' },
  },
};

export const CreateGroupConversation = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const [users, createGroupConversation, isPending] = useUnit([
    $users,
    createGroupConversationFx,
    createGroupConversationFx.pending,
  ]);

  const methods = useForm<CreateGroupConversationSchema>({
    resolver: zodResolver(createGroupConversationSchema),
    defaultValues: {
      groupName: '',
      selectedUserPublicIds: [],
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const handleOpen = () => {
    open();
  };

  const handleClose = () => {
    reset();
    close();
  };

  const onSubmit = handleSubmit(async (data) => {
    await createGroupConversation({
      body: {
        type: 'GROUP' as never,
        name: data.groupName,
        participantUserIds: data.selectedUserPublicIds,
      },
    });

    handleClose();
  });

  return (
    <>
      <Tooltip label="Новое сообщение" position="bottom" withArrow>
        <UnstyledButton
          p={7}
          onClick={handleOpen}
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
          <IconPencil size={16} stroke={1.7} />
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
          overlay: { backdropFilter: 'blur(4px)' },
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
                <IconPencil
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
                  Новая группа
                </Text>
                <Text size="xs" c="dark.3" lh={1.2} mt={2}>
                  Введите название и выберите участников
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
              <Stack gap={14}>
                <TextInput
                  {...register('groupName')}
                  label="Название группы"
                  placeholder="Введите название..."
                  error={errors.groupName?.message}
                  styles={inputStyles}
                />

                <Box>
                  <Text
                    size="11px"
                    fw={500}
                    c="dark.3"
                    mb={6}
                    style={{
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                    }}
                  >
                    Участники
                  </Text>
                  {errors.selectedUserPublicIds && (
                    <Text size="xs" c="red.5">
                      {errors.selectedUserPublicIds.message}
                    </Text>
                  )}
                  <ScrollArea h={200} scrollbarSize={3}>
                    <Stack gap={1}>
                      {users.length === 0 && (
                        <Text size="sm" c="dark.3" ta="center" py="lg">
                          Пользователи не найдены
                        </Text>
                      )}
                      {users.map((user) => (
                        <UserItem user={user} key={user.id} />
                      ))}
                    </Stack>
                  </ScrollArea>
                </Box>

                <Group justify="flex-end" gap={8} mt={4}>
                  <Button
                    variant="subtle"
                    size="xs"
                    radius={8}
                    onClick={handleClose}
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
                    Отмена
                  </Button>
                  <Button
                    type="submit"
                    size="xs"
                    radius={8}
                    loading={isPending}
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
                    Создать группу
                  </Button>
                </Group>
              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Modal>
    </>
  );
};
