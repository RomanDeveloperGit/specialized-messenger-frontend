import { type FC } from 'react';

import { useUnit } from 'effector-react';

import { Box, Group, Text } from '@mantine/core';

import type { Dto } from '@specialized-messenger/api/specs';

import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text';
import { isSystemConversationCreatedMessage } from '@/shared/lib/message/message-checker/is-system-conversation-created-message';
import { isSystemUserJoinedMessage } from '@/shared/lib/message/message-checker/is-system-user-joined-message';
import { prepareMessageForActiveConversation } from '@/shared/lib/message/prepare-message-for-active-conversation/prepare-message-for-active-conversation';
import { getUserFullName } from '@/shared/lib/user/get-user-full-name';
import { getUserInitials } from '@/shared/lib/user/get-user-initials';

import { $activeConversation } from '@/entities/active-conversation';
import { $authorizedUserId } from '@/entities/auth';

export const MessageItem: FC<{
  message: Dto['Message'];
  index: number;
}> = ({ message, index }) => {
  const [conversation, authorizedUserId] = useUnit([
    $activeConversation,
    $authorizedUserId,
  ]);

  if (!conversation) return null;

  const isOwn = message.author?.id === authorizedUserId;
  const prevMessage = conversation.messages[index - 1];
  const isFirstInGroup =
    !prevMessage || prevMessage.author?.id !== message.author?.id;
  const nextMessage = conversation.messages[index + 1];
  const isLastInGroup =
    !nextMessage || nextMessage.author?.id !== message.author?.id;

  // Find sender name for group chats
  const sender = conversation.participants.find(
    (p) => p.user.id === message.author?.id,
  );
  const senderFullName = sender
    ? getUserFullName(sender.user)
    : 'Служебное сообщение';
  const senderInitials = sender ? getUserInitials(sender.user) : 'CC';
  const senderColor = getColorSchemaByText(senderFullName);

  if (
    isSystemConversationCreatedMessage(message) ||
    isSystemUserJoinedMessage(message)
  ) {
    const dateLabel = new Date(message.createdAt).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });

    return (
      <Box
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
          <Text size="xs" c="dark.1" style={{ fontSize: 12, lineHeight: 1.4 }}>
            {prepareMessageForActiveConversation({
              conversation,
              message: message,
            })}
          </Text>
        </Box>
      </Box>
    );
  }

  return (
    <Box
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
                message: message,
              })}
            </Text>
            <Text
              size="xs"
              c={isOwn ? 'green.4' : 'dark.2'}
              ta="right"
              mt={2}
              style={{ fontSize: 10, lineHeight: 1 }}
            >
              {new Date(message.createdAt).toLocaleTimeString('ru-RU', {
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>
          </Box>
        </Box>
      </Group>
    </Box>
  );
};
