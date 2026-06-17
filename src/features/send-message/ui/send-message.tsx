import { useLayoutEffect, useState } from 'react';

import { useUnit } from 'effector-react';
import { IconSend } from '@tabler/icons-react';

import { ActionIcon, Box, Group, Text, Textarea } from '@mantine/core';

import {
  MAX_TEXT_MESSAGE_LENGTH,
  WARN_TEXT_MESSAGE_LENGTH,
} from '@/shared/lib/message/size';

import {
  $activeConversationPublicId,
  $hasActiveConversation,
} from '@/entities/active-conversation';

import { sendMessageFx } from '../model/send-message.effect';

export const SendMessage = () => {
  const [hasActiveConversation, activeConversationPublicId, sendMessage] =
    useUnit([
      $hasActiveConversation,
      $activeConversationPublicId,
      sendMessageFx,
    ]);

  const [message, setMessage] = useState('');

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessage('');
  }, [activeConversationPublicId, setMessage]);

  const handleSend = () => {
    if (!hasActiveConversation) return;
    if (!message.trim()) return;

    setMessage('');
    sendMessage({ content: message });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isWarnTextMessageLength = message.length >= WARN_TEXT_MESSAGE_LENGTH;
  const isMaxTextMessageLength = message.length >= MAX_TEXT_MESSAGE_LENGTH;

  return (
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
        <Box flex={1} style={{ position: 'relative' }}>
          <Textarea
            placeholder="Сообщение..."
            value={message}
            onChange={(e) => setMessage(e.currentTarget.value)}
            onKeyDown={handleKeyDown}
            autosize
            maxLength={MAX_TEXT_MESSAGE_LENGTH}
            styles={{
              input: {
                'background': 'var(--mantine-color-dark-6)',
                'border': '1px solid var(--mantine-color-dark-5)',
                'borderRadius': 12,
                'color': 'var(--mantine-color-gray-2)',
                'fontSize': 14,
                'padding': '8px 12px',
                'paddingBottom': isWarnTextMessageLength ? 24 : 8,
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
          {isWarnTextMessageLength && (
            <Text
              size="xs"
              style={{
                position: 'absolute',
                bottom: 6,
                right: 10,
                color: isMaxTextMessageLength
                  ? 'var(--mantine-color-red-5)'
                  : 'var(--mantine-color-yellow-8)',
                pointerEvents: 'none',
                userSelect: 'none',
                lineHeight: 1,
                fontSize: 11,
              }}
            >
              {message.length}/{MAX_TEXT_MESSAGE_LENGTH}
            </Text>
          )}
        </Box>
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
  );
};
