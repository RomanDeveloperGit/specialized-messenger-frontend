import { Fragment, useLayoutEffect, useRef } from 'react';

import { useUnit } from 'effector-react';
import {
  IconArrowLeft,
  IconDotsVertical,
  IconPhone,
  IconVideo,
} from '@tabler/icons-react';

import { ActionIcon, Box, Group, ScrollArea, Stack, Text } from '@mantine/core';

import { getConversationFullName } from '@/shared/lib/conversation/get-conversation-full-name';
import { getConversationInitials } from '@/shared/lib/conversation/get-conversation-initials';
import { isDirectConversation } from '@/shared/lib/conversation/is-direct-conversation';
import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text';

import {
  $activeConversation,
  $activeConversationParticipantUsers,
  activeConversationApi,
  getConversationFx,
} from '@/entities/active-conversation';
import { $authorizedUserId } from '@/entities/auth';

import { SendMessage } from '@/features/send-message';

import { MessageItem } from './message-item';

export const ActiveConversation = () => {
  const conversation = useUnit($activeConversation)!;
  const conversationUsers = useUnit($activeConversationParticipantUsers)!;
  const [isConversationPending, authorizedUserId, resetActiveConversation] =
    useUnit([
      getConversationFx.pending,
      $authorizedUserId,
      activeConversationApi.reset,
    ]);

  const viewportRef = useRef<HTMLDivElement>(null);

  const isDirect = isDirectConversation(conversation);
  const directConversationPeerUser = conversationUsers.find(
    (user) => user.id !== authorizedUserId,
  );

  useLayoutEffect(() => {
    if (isConversationPending) return;

    viewportRef.current?.scrollTo({
      top: viewportRef.current.scrollHeight,
    });
  }, [isConversationPending]);

  useLayoutEffect(() => {
    if (conversation.messages.at(-1)?.author?.id === authorizedUserId) {
      viewportRef.current?.scrollTo({
        top: viewportRef.current.scrollHeight,
      });
    }
  }, [conversation.messages, authorizedUserId]);

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
            <ActionIcon
              variant="subtle"
              color="dark.2"
              display={{ base: 'flex', md: 'none' }}
              onClick={() => resetActiveConversation()}
            >
              <IconArrowLeft size={18} stroke={1.7} />
            </ActionIcon>
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
              <Text size="sm" fw={600} c="gray.1" lh={1.4}>
                {fullName}
              </Text>
              {isDirect &&
                (directConversationPeerUser?.isOnline ||
                  directConversationPeerUser?.lastSeenAt) && (
                  <Fragment>
                    {directConversationPeerUser?.isOnline ? (
                      <Text size="xs" c="green.5" lh={1.4}>
                        онлайн
                      </Text>
                    ) : (
                      <Text size="xs" c="gray.6" lh={1.4}>
                        был в сети{' '}
                        {new Date(
                          directConversationPeerUser.lastSeenAt,
                        ).toLocaleTimeString()}
                      </Text>
                    )}
                  </Fragment>
                )}
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
      <ScrollArea
        flex={1}
        viewportRef={viewportRef}
        scrollbarSize={6}
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--mantine-color-green-9) 8%, transparent) 0%, transparent 60%), var(--mantine-color-dark-9)',
        }}
      >
        <Stack gap={2} px="md" py="md">
          {conversation.messages.map((msg, i) => (
            <MessageItem message={msg} index={i} key={msg.id} />
          ))}
        </Stack>
      </ScrollArea>
      <SendMessage />
    </Stack>
  );
};
