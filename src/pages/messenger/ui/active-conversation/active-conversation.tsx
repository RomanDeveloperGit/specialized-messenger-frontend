import { useEffect, useRef } from 'react';

import { useUnit } from 'effector-react';
import {
  IconArrowLeft,
  IconDotsVertical,
  IconPhone,
  IconVideo,
} from '@tabler/icons-react';

import {
  ActionIcon,
  Box,
  Center,
  Group,
  Loader,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';

import { getConversationFullName } from '@/shared/lib/conversation/get-conversation-full-name';
import { getConversationInitials } from '@/shared/lib/conversation/get-conversation-initials';
import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text';

import {
  $activeConversation,
  activeConversationApi,
  getConversationFx,
} from '@/entities/active-conversation';
import { $authorizedUserId } from '@/entities/auth';

import { SendMessage } from '@/features/send-message';

import { MessageItem } from './message-item';

export const ActiveConversation = () => {
  const [
    conversation,
    isConversationPending,
    authorizedUserId,
    resetActiveConversation,
  ] = useUnit([
    $activeConversation,
    getConversationFx.pending,
    $authorizedUserId,
    activeConversationApi.reset,
  ]);

  const savedScrollDataBeforeDataLoaded = useRef<{
    scrollHeight: number;
    scrollTop: number;
  } | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isConversationPending) {
      savedScrollDataBeforeDataLoaded.current = {
        scrollHeight: viewportRef.current?.scrollHeight || 0,
        scrollTop: viewportRef.current?.scrollTop || 0,
      };

      return;
    }

    if (savedScrollDataBeforeDataLoaded.current) {
      viewportRef.current?.scrollTo({
        top:
          savedScrollDataBeforeDataLoaded.current.scrollTop +
          (viewportRef.current?.scrollHeight ||
            0 - savedScrollDataBeforeDataLoaded.current.scrollHeight),
      });

      savedScrollDataBeforeDataLoaded.current = null;
    }
  }, [isConversationPending]);

  if (!conversation) return null;

  const fullName = getConversationFullName({
    conversation,
    viewerUserId: authorizedUserId!,
  });
  const color = getColorSchemaByText(fullName);
  const initials = getConversationInitials({
    conversation,
    viewerUserId: authorizedUserId!,
  });

  return (
    <Stack gap={0} h="100%" style={{ overflow: 'hidden' }}>
      {/* ── Header ── */}
      <Box
        px="md"
        py="sm"
        h={60}
        style={{
          borderBottom: '1px solid var(--mantine-color-dark-6)',
          background:
            'linear-gradient(180deg, var(--mantine-color-dark-7) 0%, var(--mantine-color-dark-8) 100%)',
          flexShrink: 0,
        }}
      >
        <Group justify="space-between" wrap="nowrap">
          <Group gap={10} wrap="nowrap">
            {/* Back button — visible on mobile */}
            <ActionIcon
              variant="subtle"
              color="dark.2"
              display={{ base: 'flex', md: 'none' }}
              onClick={() => resetActiveConversation()}
            >
              <IconArrowLeft size={18} stroke={1.7} />
            </ActionIcon>

            {/* Avatar */}
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
              {initials}
            </Box>

            <Box>
              <Text size="sm" fw={600} c="gray.1" lh={1.2}>
                {fullName}
              </Text>
            </Box>
          </Group>

          <Group gap={2}>
            <ActionIcon
              variant="subtle"
              color="dark.2"
              style={{ transition: 'color 0.15s' }}
              styles={{
                root: { '&:hover': { color: 'var(--mantine-color-green-5)' } },
              }}
            >
              <IconPhone size={17} stroke={1.7} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="dark.2"
              styles={{
                root: { '&:hover': { color: 'var(--mantine-color-green-5)' } },
              }}
            >
              <IconVideo size={18} stroke={1.7} />
            </ActionIcon>
            <ActionIcon
              variant="subtle"
              color="dark.2"
              styles={{
                root: { '&:hover': { color: 'var(--mantine-color-green-5)' } },
              }}
            >
              <IconDotsVertical size={17} stroke={1.7} />
            </ActionIcon>
          </Group>
        </Group>
      </Box>

      {/* ── Messages ── */}
      <ScrollArea
        flex={1}
        viewportRef={viewportRef}
        scrollbarSize={3}
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--mantine-color-green-9) 8%, transparent) 0%, transparent 60%), var(--mantine-color-dark-9)',
        }}
      >
        <Stack gap={2} px="md" py="md">
          {isConversationPending && (
            <Center py="sm">
              <Loader size="xs" color="dark.2" type="dots" />
            </Center>
          )}
          {conversation.messages.map((msg, i) => (
            <MessageItem message={msg} index={i} key={msg.id} />
          ))}
        </Stack>
      </ScrollArea>
      <SendMessage />
    </Stack>
  );
};
