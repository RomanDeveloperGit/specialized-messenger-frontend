import { useUnit } from 'effector-react';
import {
  IconCrown,
  IconUserCheck,
  IconUsers,
  IconX,
} from '@tabler/icons-react';

import {
  Badge,
  Box,
  Group,
  Loader,
  Modal,
  ScrollArea,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';

import type { Dto } from '@specialized-messenger/api/specs';

import { getPluralizedConversationParticipantsCount } from '@/shared/lib/conversation/get-pluralized-conversation-participants-count';
import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text/get-color-schema-by-text';
import { getPreparedUserLastSeenDateText } from '@/shared/lib/user/get-prepared-user-last-seen-date-text';
import { getUserFullName } from '@/shared/lib/user/get-user-full-name';
import { getUserInitials } from '@/shared/lib/user/get-user-initials';

import {
  $activeConversationOwnerUserId,
  getConversationFx,
} from '@/entities/active-conversation';
import {
  $authorizedUserId,
  $isAuthorizedUserAdmin,
} from '@/entities/authorized-user';

import { AddConversationParticipants } from '@/features/add-conversation-participant';
import { RemoveConversationParticipant } from '@/features/remove-conversation-participant/ui/remove-conversation-participant';

export const ParticipantsModal = ({
  isOpened,
  onClose,
  participants,
}: {
  isOpened: boolean;
  onClose: () => void;
  participants: Dto['ConversationParticipant'][];
}) => {
  const [
    ownerUserId,
    authorizedUserId,
    isAuthorizedUserAdmin,
    isConversationPending,
  ] = useUnit([
    $activeConversationOwnerUserId,
    $authorizedUserId,
    $isAuthorizedUserAdmin,
    getConversationFx.pending,
  ]);

  const hasChangeParticipantsPermissions =
    isAuthorizedUserAdmin && authorizedUserId === ownerUserId;

  return (
    <Modal
      opened={isOpened}
      onClose={onClose}
      withCloseButton={false}
      closeOnClickOutside={false}
      centered
      size={400}
      padding={0}
      radius={16}
      styles={{
        content: {
          background: 'var(--mantine-color-dark-8)',
          border: '1px solid var(--mantine-color-dark-6)',
          overflow: 'hidden',
        },
        overlay: { backdropFilter: 'blur(4px)' },
      }}
    >
      <Box
        style={{
          background:
            'linear-gradient(135deg, color-mix(in srgb, var(--mantine-color-green-9) 60%, var(--mantine-color-dark-8) 40%) 0%, var(--mantine-color-dark-8) 100%)',
          borderBottom: '1px solid var(--mantine-color-dark-6)',
          padding: '18px 20px 16px',
        }}
      >
        <Group justify="space-between" align="center">
          <Group gap={12} align="center">
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
              <IconUsers
                size={17}
                color="rgba(255,255,255,0.95)"
                stroke={1.7}
              />
            </Box>
            <Box>
              <Text
                size="sm"
                fw={600}
                c="gray.1"
                lh={1.2}
                style={{ letterSpacing: '-0.1px' }}
              >
                Участники
              </Text>
              <Text size="xs" c="dark.3" lh={1.2} mt={2}>
                {getPluralizedConversationParticipantsCount(
                  participants.length,
                )}
              </Text>
            </Box>
          </Group>

          <Group gap={6}>
            {hasChangeParticipantsPermissions && (
              <AddConversationParticipants />
            )}
            <UnstyledButton
              onClick={onClose}
              p={5}
              style={(theme) => ({
                'borderRadius': theme.radius.sm,
                'color': theme.colors.dark[3],
                'display': 'flex',
                'alignItems': 'center',
                'transition': 'background 0.15s, color 0.15s',
                '&:hover': {
                  background: theme.colors.dark[6],
                  color: theme.colors.gray[4],
                },
              })}
            >
              <IconX size={15} stroke={2} />
            </UnstyledButton>
          </Group>
        </Group>
      </Box>
      <Box p={12}>
        <ScrollArea.Autosize mah={420} scrollbarSize={4}>
          <Stack gap={2}>
            {isConversationPending && (
              <Group justify="center" py={16}>
                <Loader size="sm" color="green.6" type="dots" />
              </Group>
            )}
            {participants.map((participant) => {
              const { user, role } = participant;

              const isCurrentUser = user.id === authorizedUserId;
              const isOwner = role.name === 'OWNER';
              const fullName = getUserFullName(user);
              const initials = getUserInitials(user);
              const userColor = getColorSchemaByText(fullName);

              return (
                <Group
                  key={user.id}
                  gap={10}
                  px={8}
                  py={7}
                  wrap="nowrap"
                  justify="space-between"
                  style={{
                    borderRadius: 8,
                    transition: 'background 0.15s',
                    cursor: 'default',
                  }}
                  styles={{
                    root: {
                      '&:hover': { background: 'var(--mantine-color-dark-7)' },
                    },
                  }}
                >
                  <Group gap={10} wrap="nowrap" style={{ minWidth: 0 }}>
                    <Box style={{ position: 'relative', flexShrink: 0 }}>
                      <Box
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          background: userColor.backgroundColor,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          fontWeight: 600,
                          color: userColor.color,
                          letterSpacing: '0.6px',
                        }}
                      >
                        {initials}
                      </Box>
                      {user.isOnline && (
                        <Box
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: 'var(--mantine-color-green-4)',
                            border: '2px solid var(--mantine-color-dark-8)',
                          }}
                        />
                      )}
                    </Box>

                    <Box style={{ minWidth: 0 }}>
                      <Group gap={6} wrap="nowrap" align="center">
                        <Text
                          size="sm"
                          fw={500}
                          c="gray.2"
                          lh={1.35}
                          truncate
                          style={{ letterSpacing: '0.01em' }}
                        >
                          {fullName}
                        </Text>
                        {isCurrentUser && (
                          <Badge
                            size="xs"
                            variant="light"
                            radius="sm"
                            style={{
                              flexShrink: 0,
                              letterSpacing: '0.02em',
                              background: 'var(--mantine-color-dark-6)',
                              border: '1px solid var(--mantine-color-dark-4)',
                              color: 'var(--mantine-color-dark-1)',
                            }}
                            leftSection={
                              <IconUserCheck size={9} stroke={1.8} />
                            }
                          >
                            Вы
                          </Badge>
                        )}

                        {isOwner && (
                          <Badge
                            size="xs"
                            variant="light"
                            radius="sm"
                            style={{
                              flexShrink: 0,
                              letterSpacing: '0.02em',
                              background: 'var(--mantine-color-dark-6)',
                              border: '1px solid var(--mantine-color-dark-4)',
                              color: 'var(--mantine-color-yellow-6)',
                            }}
                            leftSection={<IconCrown size={9} stroke={1.8} />}
                          >
                            Владелец
                          </Badge>
                        )}
                      </Group>
                      <Text
                        size="xs"
                        c={user.isOnline ? 'green.4' : 'dark.2'}
                        lh={1.4}
                        style={{ letterSpacing: '0.01em' }}
                      >
                        {user.isOnline
                          ? 'онлайн'
                          : getPreparedUserLastSeenDateText(user.lastSeenAt)}
                      </Text>
                    </Box>
                  </Group>

                  {!isCurrentUser && hasChangeParticipantsPermissions && (
                    <RemoveConversationParticipant participant={participant} />
                  )}
                </Group>
              );
            })}
          </Stack>
        </ScrollArea.Autosize>
      </Box>
    </Modal>
  );
};
