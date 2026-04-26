import { useUnit } from 'effector-react';
import { IconLink, IconMessage2, IconPencil } from '@tabler/icons-react';

import {
  Box,
  Group,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';

import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text';
import { getConversationFullName } from '@/shared/lib/get-conversation-full-name';

import { $authorizedUserId } from '@/entities/auth';

import { getConversationInitials } from '@/pages/messenger/lib/get-conversation-initials';
import { getLastMessageText } from '@/pages/messenger/lib/get-last-message-text';

import {
  $activeConversation,
  setActiveConversationByPublicId as _setActiveConversationByPublicId,
} from '../model/active-conversation/active-conversation.store';
import { $conversations } from '../model/conversations.store';
import { $isInitMessengerPending } from '../model/is-init-messenger-pending.store';

const IS_ADMIN = true;

const SkeletonItem = ({
  widths,
  active,
}: {
  widths: [number, number, number];
  active?: boolean;
}) => (
  <Box
    py={9}
    px={active ? undefined : 8}
    style={{
      borderRadius: 8,
      borderLeft: active
        ? '2.5px solid var(--mantine-color-green-6)'
        : '2.5px solid transparent',
      paddingLeft: active ? 5.5 : 8,
      paddingRight: 8,
      background: active
        ? 'linear-gradient(90deg, color-mix(in srgb, var(--mantine-color-green-9) 38%, transparent) 0%, color-mix(in srgb, var(--mantine-color-green-9) 14%, transparent) 100%)'
        : 'transparent',
    }}
  >
    <Group gap={11} wrap="nowrap">
      <Skeleton height={42} circle style={{ flexShrink: 0 }} />
      <Box flex={1} style={{ minWidth: 0 }}>
        <Group justify="space-between" wrap="nowrap" gap={4} mb={6}>
          <Skeleton height={11} width={widths[0]} radius="sm" />
          <Skeleton height={9} width={widths[1]} radius="sm" />
        </Group>
        <Skeleton height={9} width={widths[2]} radius="sm" />
      </Box>
    </Group>
  </Box>
);

const ConversationsSidebarSkeleton = () => (
  <Stack
    gap={0}
    display="flex"
    h="100%"
    bg="dark.8"
    style={{ borderRight: '1px solid var(--mantine-color-dark-6)' }}
  >
    {/* Header */}
    <Box
      h={60}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 7px 0 14px',
        alignItems: 'center',
        borderBottom: '1px solid var(--mantine-color-dark-6)',
        background:
          'linear-gradient(180deg, var(--mantine-color-dark-7) 0%, var(--mantine-color-dark-8) 100%)',
      }}
    >
      <Group style={{ flex: 1 }} justify="space-between">
        <Group gap={10} align="center">
          <Skeleton height={34} width={34} style={{ borderRadius: 10 }} />
          <Box>
            <Skeleton height={11} width={76} radius="sm" mb={5} />
            <Skeleton height={9} width={44} radius="sm" />
          </Box>
        </Group>
        <Group gap={2}>
          <Skeleton height={28} width={28} radius="md" />
          <Skeleton height={28} width={28} radius="md" />
        </Group>
      </Group>
    </Box>

    {/* Label */}
    <Box px="md" pt={8} pb={4}>
      <Skeleton height={9} width={34} radius="sm" />
    </Box>

    {/* Items */}
    <ScrollArea flex={1} scrollbarSize={3}>
      <Stack gap={1} px={6} pb="xs">
        <SkeletonItem widths={[90, 30, 120]} />
        <SkeletonItem widths={[70, 28, 140]} />
        <SkeletonItem widths={[110, 24, 100]} />
        <SkeletonItem widths={[80, 32, 130]} />
        <Box style={{ opacity: 0.5 }}>
          <SkeletonItem widths={[60, 26, 115]} />
        </Box>
      </Stack>
    </ScrollArea>
  </Stack>
);

export const ConversationsSidebar = () => {
  const [
    isInitMessengerPending,
    conversations,
    activeConversation,
    authorizedUserId,
    setActiveConversationByPublicId,
  ] = useUnit([
    $isInitMessengerPending,
    $conversations,
    $activeConversation,
    $authorizedUserId,
    _setActiveConversationByPublicId,
  ]);

  if (isInitMessengerPending) return <ConversationsSidebarSkeleton />;

  return (
    <Stack
      gap={0}
      display={'flex'}
      h="100%"
      bg="dark.8"
      style={{
        borderRight: '1px solid var(--mantine-color-dark-6)',
      }}
    >
      <Box
        h={60}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 7px 0 14px',
          alignItems: 'center',
          borderBottom: '1px solid var(--mantine-color-dark-6)',
          background:
            'linear-gradient(180deg, var(--mantine-color-dark-7) 0%, var(--mantine-color-dark-8) 100%)',
        }}
      >
        <Group style={{ flex: 1 }} justify="space-between">
          <Group gap={10} align="center">
            <Box
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #2f9e44 0%, #1f7a33 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(47, 158, 68, 0.35)',
              }}
            >
              <IconMessage2 size={17} color="#fff" stroke={1.8} />
            </Box>
            <Box>
              <Text size="sm" fw={600} c="gray.1" lh={1.2}>
                Мессенджер
              </Text>
              <Text size="xs" c="dark.3" lh={1.2}>
                {conversations.length} чатов
              </Text>
            </Box>
          </Group>
          <Group gap={2}>
            {IS_ADMIN && (
              <Tooltip label="Создать приглашение" position="bottom" withArrow>
                <UnstyledButton
                  p={7}
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
            )}
            <Tooltip label="Новое сообщение" position="bottom" withArrow>
              <UnstyledButton
                p={7}
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
          </Group>
        </Group>
      </Box>
      <Text
        size="xs"
        fw={500}
        c="dark.3"
        px="md"
        pt={4}
        pb={2}
        style={{ letterSpacing: '0.6px', textTransform: 'uppercase' }}
      >
        Чаты
      </Text>
      <ScrollArea flex={1} scrollbarSize={3}>
        <Stack gap={1} px={6} pb="xs">
          {conversations.map((conv) => {
            const isActive = activeConversation?.publicId === conv.publicId;

            const fullName = getConversationFullName({
              conversation: conv,
              viewerUserId: authorizedUserId!,
            });
            const color = getColorSchemaByText(fullName);

            return (
              <UnstyledButton
                key={conv.id}
                py={9}
                onClick={() => {
                  if (conv.publicId !== activeConversation?.publicId) {
                    setActiveConversationByPublicId(conv.publicId);
                  }
                }}
                style={(theme) => ({
                  'borderRadius': theme.radius.md,
                  'borderLeft': isActive
                    ? '2.5px solid var(--mantine-color-green-6)'
                    : '2.5px solid transparent',
                  'paddingLeft': isActive ? 5.5 : 8,
                  'paddingRight': 8,
                  'background': isActive
                    ? 'linear-gradient(90deg, color-mix(in srgb, var(--mantine-color-green-9) 38%, transparent) 0%, color-mix(in srgb, var(--mantine-color-green-9) 14%, transparent) 100%)'
                    : 'transparent',
                  '&:hover': {
                    background: isActive
                      ? 'linear-gradient(90deg, color-mix(in srgb, var(--mantine-color-green-9) 38%, transparent) 0%, color-mix(in srgb, var(--mantine-color-green-9) 14%, transparent) 100%)'
                      : theme.colors.dark[7],
                  },
                })}
              >
                <Group gap={11} wrap="nowrap">
                  {/* Avatar with Telegram-style online dot */}
                  <Box style={{ position: 'relative', flexShrink: 0 }}>
                    <Box
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: '50%',
                        background: color.backgroundColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 14,
                        fontWeight: 500,
                        color: color.color,
                        flexShrink: 0,
                        letterSpacing: '0.5px',
                      }}
                    >
                      {getConversationInitials({
                        conversation: conv,
                        viewerUserId: authorizedUserId!,
                      })}
                    </Box>
                  </Box>
                  <Box flex={1} style={{ minWidth: 0 }}>
                    <Group justify="space-between" wrap="nowrap" gap={4} mb={2}>
                      <Text
                        size="sm"
                        fw={500}
                        c={isActive ? 'green.5' : 'gray.2'}
                        truncate
                      >
                        {fullName}
                      </Text>
                      <Text size="xs" c="dark.3" style={{ flexShrink: 0 }}>
                        {conv.createdAt}
                      </Text>
                    </Group>
                    <Group justify="space-between" wrap="nowrap" gap={4}>
                      <Text
                        size="xs"
                        c={isActive ? 'dark.1' : 'dark.2'}
                        truncate
                      >
                        {getLastMessageText({
                          message: conv.messages.at(-1)!,
                          participants: conv.participants,
                        })}
                      </Text>
                      {/* {conv.unread && (
                        <Box
                          style={{
                            minWidth: 18,
                            height: 18,
                            borderRadius: 9,
                            background: 'var(--mantine-color-green-7)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            padding: '0 5px',
                          }}
                        >
                          <Text size="xs" fw={500} c="white" lh={1}>
                            {conv.unread}
                          </Text>
                        </Box>
                      )} */}
                    </Group>
                  </Box>
                </Group>
              </UnstyledButton>
            );
          })}
        </Stack>
      </ScrollArea>
    </Stack>
  );
};
