import { Fragment, useLayoutEffect, useRef, useState } from 'react';

import { useUnit } from 'effector-react';
import { IconArrowLeft, IconUser } from '@tabler/icons-react';

import { ActionIcon, Box, Group, ScrollArea, Stack, Text } from '@mantine/core';

import { getConversationFullName } from '@/shared/lib/conversation/get-conversation-full-name';
import { getConversationInitials } from '@/shared/lib/conversation/get-conversation-initials';
import { getPluralizedConversationParticipantsCount } from '@/shared/lib/conversation/get-pluralized-conversation-participants-count';
import { isDirectConversation } from '@/shared/lib/conversation/is-direct-conversation';
import { isEqualDate } from '@/shared/lib/date/is-equal-date';
import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text/get-color-schema-by-text';
import { getPreparedUserLastSeenDateText } from '@/shared/lib/user/get-prepared-user-last-seen-date-text';

import {
  $activeConversation,
  $activeConversationParticipants,
  activeConversationApi,
  getConversationFx,
} from '@/entities/active-conversation';
import { $authorizedUserId } from '@/entities/auth';

import { SendMessage } from '@/features/send-message';

import { MessageItem } from './message-item';
import { ParticipantsModal } from './participants-modal';

export const ActiveConversation = () => {
  const conversation = useUnit($activeConversation)!;
  const conversationParticipants = useUnit($activeConversationParticipants);
  const [isConversationPending, authorizedUserId, resetActiveConversation] =
    useUnit([
      getConversationFx.pending,
      $authorizedUserId,
      activeConversationApi.reset,
    ]);

  const viewportRef = useRef<HTMLDivElement>(null);
  const isConversationMounted = useRef<boolean>(false);
  const prevScrollHeightRef = useRef<number>(0);

  const [isParticipantsModalOpened, setIsParticipantsModalOpened] =
    useState(false);

  const isDirect = isDirectConversation(conversation);
  const directConversationPeerUser = conversationParticipants.find(
    (user) => user.id !== authorizedUserId,
  )?.user;

  useLayoutEffect(() => {
    const viewport = viewportRef.current;

    if (isConversationPending || !viewport || isConversationMounted.current)
      return;

    isConversationMounted.current = true;
    viewport.scrollTo({
      top: viewport.scrollHeight,
    });
  }, [isConversationPending]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;

    if (!viewport) return;

    const isLastMessageByAuthorizedUser =
      conversation.messages.at(-1)?.author?.id === authorizedUserId;

    const wasAtBottom =
      viewport.scrollTop + viewport.clientHeight >= prevScrollHeightRef.current;

    if (isLastMessageByAuthorizedUser || wasAtBottom) {
      viewport.scrollTo({ top: viewport.scrollHeight });
    }

    prevScrollHeightRef.current = viewport.scrollHeight;
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
              {isDirect ? (
                <Fragment>
                  {directConversationPeerUser?.isOnline ? (
                    <Text size="xs" c="green.5" lh={1.4}>
                      онлайн
                    </Text>
                  ) : (
                    <Text size="xs" c="gray.6" lh={1.4}>
                      {getPreparedUserLastSeenDateText(
                        directConversationPeerUser?.lastSeenAt,
                      )}
                    </Text>
                  )}
                </Fragment>
              ) : (
                <Text size="xs" c="gray.6" lh={1.4}>
                  {getPluralizedConversationParticipantsCount(
                    conversationParticipants.length,
                  )}
                </Text>
              )}
            </Box>
          </Group>
          <Group gap={2}>
            {!isDirect && (
              <ActionIcon
                variant="subtle"
                color="dark.2"
                styles={{
                  root: {
                    '&:hover': { color: 'var(--mantine-color-green-5)' },
                  },
                }}
                onClick={() => setIsParticipantsModalOpened(true)}
              >
                <IconUser size={17} stroke={1.7} />
              </ActionIcon>
            )}
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
          {conversation.messages.map((message, i, messages) => {
            const prevMessage = messages[i - 1] as typeof message | undefined;
            const prevMessageDate = prevMessage?.createdAt;
            const currentMessageDate = message.createdAt;

            const currentDateLabel = new Date(
              message.createdAt,
            ).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });

            return (
              <Fragment key={message.id}>
                {(!prevMessageDate ||
                  !isEqualDate(
                    new Date(prevMessageDate),
                    new Date(currentMessageDate),
                  )) && (
                  <Text
                    size="xs"
                    c="dark.3"
                    style={{
                      fontSize: 11,
                      letterSpacing: '0.3px',
                      textAlign: 'center',
                      marginTop: 24,
                    }}
                  >
                    {currentDateLabel}
                  </Text>
                )}
                <MessageItem message={message} />
              </Fragment>
            );
          })}
        </Stack>
      </ScrollArea>
      <SendMessage />
      <ParticipantsModal
        isOpened={isParticipantsModalOpened}
        onClose={() => setIsParticipantsModalOpened(false)}
        participants={conversationParticipants}
      />
    </Stack>
  );
};
