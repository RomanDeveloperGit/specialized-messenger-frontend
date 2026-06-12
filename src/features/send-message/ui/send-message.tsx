import { useLayoutEffect, useState } from 'react';

import { useUnit } from 'effector-react';
import { IconSend } from '@tabler/icons-react';

import { ActionIcon, Box, Group, Textarea } from '@mantine/core';

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
  );
};
