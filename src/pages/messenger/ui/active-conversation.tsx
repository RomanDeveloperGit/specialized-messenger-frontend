// selected-conversation.tsx
import { useEffect, useRef, useState } from 'react';

import { useUnit } from 'effector-react';
import {
  IconArrowLeft,
  IconDotsVertical,
  IconMoodSmile,
  IconPaperclip,
  IconPhone,
  IconSend,
  IconVideo,
} from '@tabler/icons-react';

import {
  ActionIcon,
  Box,
  Group,
  ScrollArea,
  Stack,
  Text,
  Textarea,
} from '@mantine/core';

import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text';
import { getConversationFullName } from '@/shared/lib/get-conversation-full-name';
import { getUserFullName } from '@/shared/lib/get-user-full-name';
import { getUserInitials } from '@/shared/lib/get-user-initials';

import { $authorizedUserId } from '@/entities/auth/model';

import { getConversationInitials } from '@/pages/messenger/lib/get-conversation-initials';

import { getMessageText } from '../lib/get-message-text';
import { isSystemMessage } from '../lib/is-system-message';
import {
  $activeConversation,
  resetActiveConversation,
  sendMessage as _sendMessage,
} from '../model/active-conversation/active-conversation.store';

export const ActiveConversation = () => {
  const [conversation, authorizedUserId, sendMessage] = useUnit([
    $activeConversation,
    $authorizedUserId,
    _sendMessage,
  ]);

  const [message, setMessage] = useState('');
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

  const handleSend = () => {
    if (!message.trim()) return;
    // TODO: dispatch send message event
    setMessage('');

    sendMessage({
      content: message,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

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
              ? getUserFullName(sender.user).trim()
              : 'Служебное сообщение';
            const senderInitials = sender ? getUserInitials(sender.user) : 'CC';
            const senderColor = getColorSchemaByText(senderFullName);

            if (isSystemMessage(msg)) {
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
                      {getMessageText({
                        message: msg,
                        participants: conversation.participants,
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
                        {getMessageText({
                          message: msg,
                          participants: conversation.participants,
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

      {/* ── Input ── */}
      <Box
        px="md"
        py="sm"
        style={{
          borderTop: '1px solid var(--mantine-color-dark-6)',
          background: 'var(--mantine-color-dark-8)',
          flexShrink: 0,
        }}
      >
        <Group gap={8} align="flex-end" wrap="nowrap">
          <ActionIcon
            variant="subtle"
            color="dark.2"
            size="lg"
            style={{ flexShrink: 0, marginBottom: 2 }}
            styles={{
              root: { '&:hover': { color: 'var(--mantine-color-green-5)' } },
            }}
          >
            <IconMoodSmile size={20} stroke={1.6} />
          </ActionIcon>

          <ActionIcon
            variant="subtle"
            color="dark.2"
            size="lg"
            style={{ flexShrink: 0, marginBottom: 2 }}
            styles={{
              root: { '&:hover': { color: 'var(--mantine-color-green-5)' } },
            }}
          >
            <IconPaperclip size={19} stroke={1.6} />
          </ActionIcon>

          <Textarea
            flex={1}
            placeholder="Сообщение..."
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            autosize
            minRows={1}
            maxRows={5}
            styles={{
              input: {
                'background': 'var(--mantine-color-dark-6)',
                'border': '1px solid var(--mantine-color-dark-5)',
                'borderRadius': 12,
                'color': 'var(--mantine-color-gray-2)',
                'fontSize': 14,
                'padding': '8px 12px',
                'resize': 'none',
                'transition': 'border-color 0.15s',
                '&:focus': {
                  borderColor: 'var(--mantine-color-green-7)',
                },
                '&::placeholder': {
                  color: 'var(--mantine-color-dark-3)',
                },
              },
            }}
          />
          <ActionIcon
            size="lg"
            radius="xl"
            onClick={handleSend}
            disabled={!message.trim()}
            style={{
              flexShrink: 0,
              marginBottom: 2,
              background: message.trim()
                ? 'linear-gradient(135deg, var(--mantine-color-green-7) 0%, var(--mantine-color-green-8) 100%)'
                : 'var(--mantine-color-dark-6)',
              color: message.trim() ? 'white' : 'var(--mantine-color-dark-3)',
              transition: 'background 0.2s, transform 0.1s',
              boxShadow: message.trim()
                ? '0 2px 8px rgba(47, 158, 68, 0.35)'
                : 'none',
            }}
          >
            <IconSend
              size={16}
              stroke={1.8}
              style={{ transform: 'translateX(1px)' }}
            />
          </ActionIcon>
        </Group>
      </Box>
    </Stack>
  );
};
