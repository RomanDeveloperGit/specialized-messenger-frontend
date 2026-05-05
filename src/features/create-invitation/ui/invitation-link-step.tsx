import type { FC } from 'react';

import { useFormContext } from 'react-hook-form';

import { useUnit } from 'effector-react';
import { IconCheck, IconCopy } from '@tabler/icons-react';

import {
  Box,
  Button,
  Group,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';

import { getUserFullName } from '@/shared/lib/user/get-user-full-name';

import { type CreateInvitationSchema } from '../model/create-invitation.schema';
import { $invitationLink } from '../model/invitation-link.store';

export const InvitationLinkStep: FC<{
  closeModal: () => void;
}> = ({ closeModal }) => {
  const [invitationLink] = useUnit([$invitationLink]);

  const clipboard = useClipboard({ timeout: 2000 });

  const { getValues } = useFormContext<CreateInvitationSchema>();

  return (
    <Stack gap={0}>
      <Box
        mb={16}
        p={12}
        style={{
          background:
            'color-mix(in srgb, var(--mantine-color-green-9) 35%, transparent)',
          border:
            '1px solid color-mix(in srgb, var(--mantine-color-green-8) 50%, transparent)',
          borderRadius: 10,
        }}
      >
        <Group gap={8} align="center">
          <Box
            style={{
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'var(--mantine-color-green-8)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <IconCheck size={11} color="white" stroke={3} />
          </Box>
          <Text size="xs" c="green.4" fw={500}>
            Приглашение создано для{' '}
            <Text component="span" c="green.3" fw={600}>
              {getUserFullName(getValues())}
            </Text>
          </Text>
        </Group>
      </Box>

      <Text
        size="11px"
        fw={500}
        c="dark.3"
        mb={6}
        style={{ letterSpacing: '0.5px', textTransform: 'uppercase' }}
      >
        Ссылка для приглашения
      </Text>
      <Box
        style={{
          background: 'var(--mantine-color-dark-9)',
          border: '1px solid var(--mantine-color-dark-5)',
          borderRadius: 10,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <Text
          size="xs"
          c="gray.4"
          flex={1}
          px={12}
          py={11}
          style={{
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            fontFamily: 'monospace',
            fontSize: 12,
            letterSpacing: '0.3px',
          }}
        >
          {invitationLink}
        </Text>

        <Tooltip
          label={clipboard.copied ? 'Скопировано!' : 'Скопировать'}
          position="top"
          withArrow
        >
          <UnstyledButton
            onClick={() => clipboard.copy(invitationLink)}
            px={12}
            style={{
              minHeight: 42,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              borderLeft: '1px solid var(--mantine-color-dark-5)',
              color: clipboard.copied
                ? 'var(--mantine-color-green-5)'
                : 'var(--mantine-color-dark-2)',
              background: clipboard.copied
                ? 'color-mix(in srgb, var(--mantine-color-green-9) 25%, transparent)'
                : 'transparent',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {clipboard.copied ? (
              <IconCheck size={15} stroke={2.5} />
            ) : (
              <IconCopy size={15} stroke={1.7} />
            )}
          </UnstyledButton>
        </Tooltip>
      </Box>

      <Group gap={8} justify="flex-end" mt={16}>
        <Button
          size="xs"
          radius={8}
          onClick={closeModal}
          style={{
            background: 'linear-gradient(135deg, #2f9e44 0%, #1f7a33 100%)',
            fontSize: 12,
            fontWeight: 600,
            border: 'none',
            paddingLeft: 14,
            paddingRight: 14,
          }}
        >
          Готово
        </Button>
      </Group>
    </Stack>
  );
};
