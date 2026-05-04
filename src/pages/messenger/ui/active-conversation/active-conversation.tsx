import { useEffect, useRef } from 'react';

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
import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text';
import { isSystemConversationCreatedMessage } from '@/shared/lib/message/message-checker/is-system-conversation-created-message';
import { isSystemUserJoinedMessage } from '@/shared/lib/message/message-checker/is-system-user-joined-message';
import { prepareMessageForActiveConversation } from '@/shared/lib/message/prepare-message-for-active-conversation/prepare-message-for-active-conversation';
import { getUserFullName } from '@/shared/lib/user/get-user-full-name';
import { getUserInitials } from '@/shared/lib/user/get-user-initials';

import {
  $activeConversation,
  activeConversationApi,
} from '@/entities/active-conversation';
import { $authorizedUserId } from '@/entities/auth';

import { SendMessage } from '@/features/send-message';

export const ActiveConversation = () => {
  const [conversation, authorizedUserId, resetActiveConversation] = useUnit([
    $activeConversation,
    $authorizedUserId,
    activeConversationApi.reset,
  ]);

  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    viewport.current?.scrollTo({
      top: viewport.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [conversation?.messages]);

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
              <Text size="xs" c="green.6" lh={1.3}>
                в сети
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
        viewportRef={viewport}
        scrollbarSize={3}
        style={{
          background:
            'radial-gradient(ellipse at 20% 50%, color-mix(in srgb, var(--mantine-color-green-9) 8%, transparent) 0%, transparent 60%), var(--mantine-color-dark-9)',
        }}
      >
        <Stack gap={2} px="md" py="md">
          {conversation.messages.map((msg, i) => {
            const isOwn = msg.author?.id === authorizedUserId;
            const prevMsg = conversation.messages[i - 1];
            const isFirstInGroup =
              !prevMsg || prevMsg.author?.id !== msg.author?.id;
            const nextMsg = conversation.messages[i + 1];
            const isLastInGroup =
              !nextMsg || nextMsg.author?.id !== msg.author?.id;

            // Find sender name for group chats
            const sender = conversation.participants.find(
              (p) => p.user.id === msg.author?.id,
            );
            const senderFullName = sender
              ? getUserFullName(sender.user)
              : 'Служебное сообщение';
            const senderInitials = sender ? getUserInitials(sender.user) : 'CC';
            const senderColor = getColorSchemaByText(senderFullName);

            if (
              isSystemConversationCreatedMessage(msg) ||
              isSystemUserJoinedMessage(msg)
            ) {
              const dateLabel = new Date(msg.createdAt).toLocaleDateString(
                'ru-RU',
                {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                },
              );

              return (
                <Box
                  key={msg.id}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 6,
                    marginTop: 12,
                    marginBottom: 4,
                  }}
                >
                  {/* Дата */}
                  <Text
                    size="xs"
                    c="dark.3"
                    style={{ fontSize: 11, letterSpacing: '0.3px' }}
                  >
                    {dateLabel}
                  </Text>

                  {/* Системный текст-пилюля */}
                  <Box
                    style={{
                      background: 'rgba(0, 0, 0, 0.25)',
                      backdropFilter: 'blur(6px)',
                      borderRadius: 999,
                      padding: '4px 14px',
                      maxWidth: '75%',
                      textAlign: 'center',
                    }}
                  >
                    <Text
                      size="xs"
                      c="dark.1"
                      style={{ fontSize: 12, lineHeight: 1.4 }}
                    >
                      {prepareMessageForActiveConversation({
                        message: msg,
                        conversation,
                      })}
                    </Text>
                  </Box>
                </Box>
              );
            }

            return (
              <Box
                key={msg.id ?? i}
                style={{
                  display: 'flex',
                  justifyContent: isOwn ? 'flex-end' : 'flex-start',
                  marginTop: isFirstInGroup ? 8 : 1,
                }}
              >
                <Group
                  gap={8}
                  align="flex-end"
                  wrap="nowrap"
                  style={{
                    maxWidth: '72%',
                    flexDirection: isOwn ? 'row-reverse' : 'row',
                  }}
                >
                  {!isOwn && (
                    <Box
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: senderColor.backgroundColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 10,
                        fontWeight: 500,
                        color: senderColor.color,
                        flexShrink: 0,
                        letterSpacing: '0.4px',
                      }}
                    >
                      {senderInitials}
                    </Box>
                  )}
                  <Box>
                    <Box
                      style={{
                        padding: '7px 11px',
                        borderRadius: isOwn
                          ? `12px 12px ${isLastInGroup ? 4 : 12}px 12px`
                          : `12px 12px 12px ${isLastInGroup ? 4 : 12}px`,
                        background: isOwn
                          ? 'linear-gradient(135deg, var(--mantine-color-green-8) 0%, var(--mantine-color-green-9) 100%)'
                          : 'var(--mantine-color-dark-6)',
                        boxShadow: isOwn
                          ? '0 1px 6px rgba(47, 158, 68, 0.18)'
                          : '0 1px 4px rgba(0,0,0,0.18)',
                        position: 'relative',
                      }}
                    >
                      {!isOwn && (
                        <Text
                          size="sm"
                          c={senderColor.color}
                          style={{ lineHeight: 1.5, wordBreak: 'break-word' }}
                        >
                          {senderFullName}
                        </Text>
                      )}
                      <Text
                        size="sm"
                        c={isOwn ? 'green.1' : 'gray.2'}
                        style={{ lineHeight: 1.5, wordBreak: 'break-word' }}
                      >
                        {prepareMessageForActiveConversation({
                          conversation,
                          message: msg,
                        })}
                      </Text>
                      <Text
                        size="xs"
                        c={isOwn ? 'green.4' : 'dark.2'}
                        ta="right"
                        mt={2}
                        style={{ fontSize: 10, lineHeight: 1 }}
                      >
                        {new Date(msg.createdAt).toLocaleTimeString('ru-RU', {
                          hour: 'numeric',
                          minute: 'numeric',
                        })}
                      </Text>
                    </Box>
                  </Box>
                </Group>
              </Box>
            );
          })}
        </Stack>
      </ScrollArea>
      <SendMessage />
    </Stack>
  );
};
