import { useEffect, useState } from 'react';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useUnit } from 'effector-react';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';

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

import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text';
import { getUserFullName } from '@/shared/lib/get-user-full-name';

import {
  type CreateConversationSchema,
  createConversationSchema,
} from '../model/create-conversation.schema';
import { createConversationFx } from '../model/create-conversation.store';
import { $users } from '../model/users.store';

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

function pluralize(n: number, one: string, few: string, many: string) {
  const mod10 = n % 10,
    mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100)) return few;
  return many;
}

// ─── Component ───────────────────────────────────────────────────────────────

export const CreateConversation = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [step, setStep] = useState<1 | 2>(1);

  const [users, createConversation, isPending] = useUnit([
    $users,
    createConversationFx,
    createConversationFx.pending,
  ]);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateConversationSchema>({
    resolver: zodResolver(createConversationSchema),
    defaultValues: {
      isGroup: false,
      selectedUserIds: [],
      groupName: '',
    },
  });

  const selectedUserIds = watch('selectedUserIds');
  const isGroup = selectedUserIds.length > 1;

  useEffect(() => {
    setValue('isGroup', isGroup as false); // cast нужен из-за discriminatedUnion
  }, [isGroup, setValue]);

  const handleClose = () => {
    close();
    reset();
    setStep(1);
  };

  const onSubmit = handleSubmit(async (data) => {
    // добавить еще свитчер - группа это или нет
    if (!data.isGroup) {
      await createConversation({
        requestBody: {
          type: 'DIRECT' as never,
          participantUserIds: [data.selectedUserIds[0]],
        },
      });
    } else {
      await createConversation({
        requestBody: {
          type: 'GROUP' as never,
          name: data.groupName,
          participantUserIds: data.selectedUserIds,
        },
      });
    }
    handleClose();
  });

  const toggleUser = (publicId: string) => {
    const next = selectedUserIds.includes(publicId)
      ? selectedUserIds.filter((x) => x !== publicId)
      : [...selectedUserIds, publicId];
    setValue('selectedUserIds', next, { shouldValidate: step === 1 });
  };

  const handleNext = () => {
    if (!isGroup) {
      onSubmit();
    } else {
      setStep(2);
    }
  };

  return (
    <>
      <Tooltip label="Новое сообщение" position="bottom" withArrow>
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
        {/* Header */}
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
                  {step === 1 ? 'Новое сообщение' : 'Название группы'}
                </Text>
                <Text size="xs" c="dark.3" lh={1.2} mt={2}>
                  {step === 1 ? 'Выберите получателей' : 'Шаг 2 из 2'}
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
          {/* Step dots */}
          <Group gap={6} mb={14} align="center">
            <Box
              style={{
                height: 6,
                width: step === 1 ? 18 : 6,
                borderRadius: 3,
                background:
                  step === 1
                    ? 'var(--mantine-color-green-6)'
                    : 'var(--mantine-color-dark-5)',
                transition: 'width 0.2s, background 0.2s',
              }}
            />
            {isGroup && (
              <Box
                style={{
                  height: 6,
                  width: step === 2 ? 18 : 6,
                  borderRadius: 3,
                  background:
                    step === 2
                      ? 'var(--mantine-color-green-6)'
                      : 'var(--mantine-color-dark-5)',
                  transition: 'width 0.2s, background 0.2s',
                }}
              />
            )}
            <Text
              size="11px"
              fw={500}
              c="dark.3"
              ml={2}
              style={{ letterSpacing: '0.5px', textTransform: 'uppercase' }}
            >
              {isGroup ? `Шаг ${step} из 2` : 'Шаг 1 из 1'}
            </Text>
          </Group>

          <form onSubmit={onSubmit}>
            {/* ── STEP 1 ── */}
            {step === 1 && (
              <Stack gap={10}>
                <ScrollArea h={240} scrollbarSize={3}>
                  <Stack gap={1}>
                    {users.length === 0 && (
                      <Text size="sm" c="dark.3" ta="center" py="lg">
                        Пользователи не найдены
                      </Text>
                    )}
                    {users.map((user) => {
                      const isSelected = selectedUserIds.includes(
                        user.publicId,
                      );
                      const fullName = getUserFullName(user);
                      const color = getColorSchemaByText(fullName);

                      return (
                        <UnstyledButton
                          key={user.id}
                          onClick={() => toggleUser(user.publicId)}
                          py={8}
                          px={8}
                          style={(theme) => ({
                            'borderRadius': theme.radius.md,
                            'border': isSelected
                              ? '1.5px solid color-mix(in srgb, var(--mantine-color-green-7) 40%, transparent)'
                              : '1.5px solid transparent',
                            'background': isSelected
                              ? 'linear-gradient(90deg, color-mix(in srgb, var(--mantine-color-green-9) 45%, transparent) 0%, color-mix(in srgb, var(--mantine-color-green-9) 18%, transparent) 100%)'
                              : 'transparent',
                            'transition':
                              'background 0.12s, border-color 0.12s',
                            '&:hover': {
                              background: isSelected
                                ? 'linear-gradient(90deg, color-mix(in srgb, var(--mantine-color-green-9) 45%, transparent) 0%, color-mix(in srgb, var(--mantine-color-green-9) 18%, transparent) 100%)'
                                : theme.colors.dark[7],
                            },
                          })}
                        >
                          <Group gap={10} wrap="nowrap">
                            <Box
                              style={{
                                width: 20,
                                height: 20,
                                borderRadius: '50%',
                                flexShrink: 0,
                                border: isSelected
                                  ? '1.5px solid var(--mantine-color-green-6)'
                                  : '1.5px solid var(--mantine-color-dark-4)',
                                background: isSelected
                                  ? 'var(--mantine-color-green-7)'
                                  : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition:
                                  'background 0.15s, border-color 0.15s',
                              }}
                            >
                              {isSelected && (
                                <IconCheck size={11} color="white" stroke={3} />
                              )}
                            </Box>

                            <Box
                              style={{
                                width: 38,
                                height: 38,
                                borderRadius: '50%',
                                background: color.backgroundColor,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 13,
                                fontWeight: 500,
                                color: color.color,
                                flexShrink: 0,
                                letterSpacing: '0.5px',
                              }}
                            >
                              {(
                                user.lastName[0] + user.firstName[0]
                              ).toUpperCase()}
                            </Box>

                            <Box style={{ minWidth: 0 }}>
                              <Text
                                size="sm"
                                fw={500}
                                c={isSelected ? 'green.5' : 'gray.2'}
                                truncate
                              >
                                {user.lastName} {user.firstName}
                              </Text>
                              <Text size="xs" c="dark.3" mt={1}>
                                Зарегистрирован{' '}
                                {new Date(user.createdAt).toLocaleDateString(
                                  'ru-RU',
                                  {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                  },
                                )}
                              </Text>
                            </Box>
                          </Group>
                        </UnstyledButton>
                      );
                    })}
                  </Stack>
                </ScrollArea>

                {/* Chips */}
                {selectedUserIds.length > 0 && (
                  <Box
                    p={8}
                    style={{
                      background:
                        'color-mix(in srgb, var(--mantine-color-green-9) 30%, transparent)',
                      border:
                        '1px solid color-mix(in srgb, var(--mantine-color-green-8) 25%, transparent)',
                      borderRadius: 8,
                    }}
                  >
                    <Group gap={4} wrap="wrap">
                      {selectedUserIds.map((publicId) => {
                        const u = users.find((x) => x.publicId === publicId)!;
                        return (
                          <UnstyledButton
                            key={publicId}
                            onClick={() => toggleUser(publicId)}
                            px={8}
                            py={3}
                            style={() => ({
                              'borderRadius': 20,
                              'background':
                                'color-mix(in srgb, var(--mantine-color-green-8) 20%, var(--mantine-color-dark-9))',
                              'border':
                                '1px solid color-mix(in srgb, var(--mantine-color-green-7) 35%, transparent)',
                              'display': 'flex',
                              'alignItems': 'center',
                              'gap': 4,
                              'transition':
                                'background 0.12s, border-color 0.12s',
                              '&:hover': {
                                background:
                                  'color-mix(in srgb, var(--mantine-color-red-9) 30%, var(--mantine-color-dark-9))',
                                borderColor:
                                  'color-mix(in srgb, var(--mantine-color-red-7) 30%, transparent)',
                              },
                            })}
                          >
                            <Text size="11px" c="green.4" fw={500}>
                              {u.lastName} {u.firstName}
                            </Text>
                            <Text size="11px" c="dark.3">
                              ×
                            </Text>
                          </UnstyledButton>
                        );
                      })}
                    </Group>
                  </Box>
                )}

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
                    size="xs"
                    radius={8}
                    disabled={selectedUserIds.length === 0}
                    loading={isPending && !isGroup}
                    onClick={handleNext}
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
                    {isGroup ? 'Далее →' : 'Начать чат'}
                  </Button>
                </Group>
              </Stack>
            )}

            {/* ── STEP 2 ── */}
            {step === 2 && (
              <Stack gap={14}>
                <Box
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
                      <Text component="span" c="green.3" fw={600}>
                        {selectedUserIds.length}{' '}
                        {pluralize(
                          selectedUserIds.length,
                          'участник',
                          'участника',
                          'участников',
                        )}
                      </Text>{' '}
                      будут добавлены в группу
                    </Text>
                  </Group>
                </Box>

                <Controller
                  name="groupName"
                  control={control}
                  render={({ field }) => (
                    <TextInput
                      {...field}
                      label="Название группы"
                      placeholder="Введите название..."
                      error={errors.groupName?.message}
                      styles={inputStyles}
                    />
                  )}
                />

                <Group justify="flex-end" gap={8}>
                  <Button
                    variant="subtle"
                    size="xs"
                    radius={8}
                    onClick={() => setStep(1)}
                    styles={{
                      root: {
                        'color': 'var(--mantine-color-dark-2)',
                        'fontSize': 12,
                        '&:hover': {
                          background: 'var(--mantine-color-dark-7)',
                        },
                      },
                    }}
                  >
                    ← Назад
                  </Button>
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
            )}
          </form>
        </Box>
      </Modal>
    </>
  );
};
