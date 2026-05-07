import type { FC } from 'react';

import { useFormContext, useWatch } from 'react-hook-form';

import { IconCheck } from '@tabler/icons-react';

import { Box, Group, Text, UnstyledButton } from '@mantine/core';

import type { Dto } from '@specialized-messenger/api/specs';

import { getColorSchemaByText } from '@/shared/lib/get-color-schema-by-text';
import { getUserFullName } from '@/shared/lib/user/get-user-full-name';
import { getUserInitials } from '@/shared/lib/user/get-user-initials';

import type { CreateGroupConversationSchema } from '../../model/create-group-conversation.schema';

export const UserItem: FC<{
  user: Dto['User'];
}> = ({ user }) => {
  const { setValue } = useFormContext<CreateGroupConversationSchema>();
  const selectedUserPublicIds = useWatch<CreateGroupConversationSchema>({
    name: 'selectedUserPublicIds',
  }) as string[];

  const toggleUser = (publicId: string) => {
    const newUserPublicIds = selectedUserPublicIds.includes(publicId)
      ? selectedUserPublicIds.filter(
          (selectedPublicId) => selectedPublicId !== publicId,
        )
      : [...selectedUserPublicIds, publicId];

    setValue('selectedUserPublicIds', newUserPublicIds, {
      shouldValidate: true,
    });
  };

  const isSelected = selectedUserPublicIds.includes(user.publicId);
  const fullName = getUserFullName(user);
  const color = getColorSchemaByText(fullName);

  return (
    <UnstyledButton
      key={user.id}
      onClick={() => toggleUser(user.publicId)}
      py={8}
      px={8}
      style={(theme) => ({
        'borderRadius': theme.radius.md,
        'border': isSelected
          ? '1.5px solid color-mix(in srgb, var(--mantine-color-green-7) 40%, transparent)'
          : '1.5px solid transparent',
        'background': isSelected
          ? 'linear-gradient(90deg, color-mix(in srgb, var(--mantine-color-green-9) 45%, transparent) 0%, color-mix(in srgb, var(--mantine-color-green-9) 18%, transparent) 100%)'
          : 'transparent',
        'transition': 'background 0.12s, border-color 0.12s',
        '&:hover': {
          background: isSelected
            ? 'linear-gradient(90deg, color-mix(in srgb, var(--mantine-color-green-9) 45%, transparent) 0%, color-mix(in srgb, var(--mantine-color-green-9) 18%, transparent) 100%)'
            : theme.colors.dark[7],
        },
      })}
    >
      <Group gap={10} wrap="nowrap">
        <Box
          style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            flexShrink: 0,
            border: isSelected
              ? '1.5px solid var(--mantine-color-green-6)'
              : '1.5px solid var(--mantine-color-dark-4)',
            background: isSelected
              ? 'var(--mantine-color-green-7)'
              : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.15s, border-color 0.15s',
          }}
        >
          {isSelected && <IconCheck size={11} color="white" stroke={3} />}
        </Box>

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
          {getUserInitials(user)}
        </Box>

        <Box style={{ minWidth: 0 }}>
          <Text
            size="sm"
            fw={500}
            c={isSelected ? 'green.5' : 'gray.2'}
            truncate
          >
            {getUserFullName(user)}
          </Text>
          <Text size="xs" c="dark.3" mt={1}>
            Зарегистрирован{' '}
            {new Date(user.createdAt).toLocaleDateString('ru-RU', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            })}
          </Text>
        </Box>
      </Group>
    </UnstyledButton>
  );
};
