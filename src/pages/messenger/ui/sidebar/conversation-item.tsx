import type { FC } from 'react';

import { useUnit } from 'effector-react';

import { Box, Group, Text, UnstyledButton } from '@mantine/core';

import type { Dto } from '@specialized-messenger/api/specs';

import { getConversationFullName } from '@/shared/lib/conversation/get-conversation-full-name';
import { getConversationInitials } from '@/shared/lib/conversation/get-conversation-initials';
import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text';
import { prepareLastMessageForConversationList } from '@/shared/lib/message/prepare-last-message-for-conversation-list/prepare-last-message-for-conversation-list';

import { $activeConversation } from '@/entities/active-conversation';
import { $authorizedUserId } from '@/entities/auth';

import { openConversation as rawOpenConversation } from '@/features/open-conversation';

export const ConversationItem: FC<{
  conversation: Dto['Conversation'];
}> = ({ conversation }) => {
  const [activeConversation, authorizedUserId, openConversation] = useUnit([
    $activeConversation,
    $authorizedUserId,
    rawOpenConversation,
  ]);

  const isActive = activeConversation?.publicId === conversation.publicId;

  const fullName = getConversationFullName({
    conversation: conversation,
    viewerUserId: authorizedUserId!,
  });
  const color = getColorSchemaByText(fullName);

  return (
    <UnstyledButton
      key={conversation.id}
      py={9}
      onClick={() => {
        openConversation({ publicId: conversation.publicId });
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
              conversation: conversation,
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
              {new Date(
                conversation.messages.at(-1)!.createdAt,
              ).toLocaleDateString('ru-RU', {
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
              })}
            </Text>
          </Group>
          <Group justify="space-between" wrap="nowrap" gap={4}>
            <Text size="xs" c={isActive ? 'dark.1' : 'dark.2'} truncate>
              {prepareLastMessageForConversationList(conversation)}
            </Text>
            {/* {conversation.unread && (
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
                            {conversation.unread}
                          </Text>
                        </Box>
                      )} */}
          </Group>
        </Box>
      </Group>
    </UnstyledButton>
  );
};
