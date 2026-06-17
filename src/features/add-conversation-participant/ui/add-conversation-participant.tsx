import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUnit } from 'effector-react';
import { IconUserPlus, IconX } from '@tabler/icons-react';

import {
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { $activeConversationPublicId } from '@/entities/active-conversation';

import { addConversationParticipantsFx } from '../model/add-conversation-participant.effect';
import {
  type AddConversationParticipantsSchema,
  addConversationParticipantsSchema,
} from '../model/add-conversation-participant.schema';
import { UserList } from './user-list';

export const AddConversationParticipants = () => {
  const [activeConversationPublicId, addConversationParticipants, isPending] =
    useUnit([
      $activeConversationPublicId,
      addConversationParticipantsFx,
      addConversationParticipantsFx.pending,
    ]);

  const [opened, { open, close }] = useDisclosure(false);

  const methods = useForm<AddConversationParticipantsSchema>({
    resolver: zodResolver(addConversationParticipantsSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      selectedUserPublicIds: [],
    },
  });

  const { handleSubmit, reset } = methods;

  const handleClose = () => {
    reset();
    close();
  };

  const onSubmit = handleSubmit(async (data) => {
    await addConversationParticipants({
      conversationPublicId: activeConversationPublicId!,
      body: {
        userIds: data.selectedUserPublicIds,
      },
    });

    handleClose();
  });

  return (
    <>
      <Tooltip label="Добавить участника" position="bottom" withArrow>
        <UnstyledButton
          p={6}
          onClick={open}
          style={(theme) => ({
            'borderRadius': theme.radius.sm,
            'color': theme.colors.green[4],
            'display': 'flex',
            'alignItems': 'center',
            'background':
              'color-mix(in srgb, var(--mantine-color-green-9) 80%, transparent)',
            'border':
              '1px solid color-mix(in srgb, var(--mantine-color-green-7) 60%, transparent)',
            'transition': 'background 0.15s, border-color 0.15s',
            '&:hover': {
              background:
                'color-mix(in srgb, var(--mantine-color-green-8) 80%, transparent)',
              borderColor: theme.colors.green[6],
            },
          })}
        >
          <IconUserPlus size={15} stroke={1.7} />
        </UnstyledButton>
      </Tooltip>

      <Modal
        opened={opened}
        onClose={handleClose}
        withCloseButton={false}
        closeOnClickOutside={false}
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
                  Добавить участников
                </Text>
                <Text size="xs" c="dark.3" lh={1.2} mt={2}>
                  Выберите пользователей из списка
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
                <UserList />
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
                    Добавить
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
