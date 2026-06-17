import type { FC } from 'react';

import { useUnit } from 'effector-react';
import { IconUserMinus, IconX } from '@tabler/icons-react';

import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  Stack,
  Text,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import type { Dto } from '@specialized-messenger/api/specs';

import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text/get-color-schema-by-text';
import { getUserFullName } from '@/shared/lib/user/get-user-full-name';
import { getUserInitials } from '@/shared/lib/user/get-user-initials';

import { $activeConversationPublicId } from '@/entities/active-conversation';

import { removeConversationParticipantFx } from '../model/remove-conversation-participant.effect';

export const RemoveConversationParticipant: FC<{
  participant: Dto['ConversationParticipant'];
}> = ({ participant }) => {
  const [activeConversationPublicId, removeConversationParticipant, isPending] =
    useUnit([
      $activeConversationPublicId,
      removeConversationParticipantFx,
      removeConversationParticipantFx.pending,
    ]);

  const [opened, { open, close }] = useDisclosure(false);

  const { user } = participant;
  const fullName = getUserFullName(user);
  const initials = getUserInitials(user);
  const userColor = getColorSchemaByText(fullName);

  const handleConfirm = async () => {
    await removeConversationParticipant({
      conversationPublicId: activeConversationPublicId!,
      participantPublicId: participant.publicId,
    });
    close();
  };

  return (
    <>
      <ActionIcon
        variant="subtle"
        color="red"
        size="sm"
        radius="sm"
        style={{
          flexShrink: 0,
          background:
            'color-mix(in srgb, var(--mantine-color-red-9) 80%, transparent)',
          border:
            '1px solid color-mix(in srgb, var(--mantine-color-red-7) 60%, transparent)',
        }}
        onClick={open}
      >
        <IconUserMinus size={14} stroke={1.7} />
      </ActionIcon>
      <Modal
        opened={opened}
        onClose={close}
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
            padding: '18px 20px 16px',
            borderBottom: '1px solid var(--mantine-color-dark-6)',
          }}
        >
          <Group justify="space-between" align="center">
            <Group gap={12} align="center">
              <Box
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'var(--mantine-color-red-8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <IconUserMinus
                  size={17}
                  color="rgba(255,255,255,0.9)"
                  stroke={1.7}
                />
              </Box>
              <Box>
                <Text size="sm" fw={500} c="gray.1" lh={1.3}>
                  Удалить участника
                </Text>
                <Text size="xs" c="dark.3" lh={1.3} mt={2}>
                  Действие необратимо
                </Text>
              </Box>
            </Group>

            <ActionIcon
              variant="subtle"
              color="gray"
              size="sm"
              radius="sm"
              onClick={close}
            >
              <IconX size={15} stroke={2} />
            </ActionIcon>
          </Group>
        </Box>
        <Box p={20}>
          <Stack gap={14}>
            <Group
              gap={12}
              align="center"
              style={{
                padding: '10px 14px',
                background: 'var(--mantine-color-dark-9)',
                border: '1px solid var(--mantine-color-dark-6)',
                borderRadius: 10,
              }}
            >
              <Box style={{ position: 'relative', flexShrink: 0 }}>
                <Box
                  style={{
                    width: 36,
                    height: 36,
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
                      border: '2px solid var(--mantine-color-dark-9)',
                    }}
                  />
                )}
              </Box>
              <Box>
                <Text size="sm" fw={500} c="gray.1" lh={1.3}>
                  {fullName}
                </Text>
                <Text
                  size="xs"
                  c={user.isOnline ? 'green.4' : 'dark.3'}
                  lh={1.3}
                  mt={1}
                >
                  {user.isOnline ? 'онлайн' : 'не в сети'}
                </Text>
              </Box>
            </Group>
            <Group justify="flex-end" gap={8} mt={2}>
              <Button
                variant="subtle"
                size="xs"
                radius={8}
                color="gray"
                onClick={close}
              >
                Отмена
              </Button>
              <Button
                size="xs"
                radius={8}
                color="red.9"
                loading={isPending}
                leftSection={<IconUserMinus size={13} stroke={1.7} />}
                onClick={handleConfirm}
              >
                Удалить из беседы
              </Button>
            </Group>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};
