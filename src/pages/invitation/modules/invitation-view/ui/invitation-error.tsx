import { IconMailOpened } from '@tabler/icons-react';

import { Stack, Text, ThemeIcon } from '@mantine/core';

export const InvitationError = () => {
  return (
    <Stack gap="lg" align="center">
      <ThemeIcon size={48} radius="md" color="red">
        <IconMailOpened size={24} />
      </ThemeIcon>
      <Stack gap="xs" align="center">
        <Text size="lg" fw={500}>
          Приглашение недействительно
        </Text>
        <Text size="xs" c="dimmed" ta="center">
          Обратитесь к администратору системы за новым приглашением
        </Text>
      </Stack>
    </Stack>
  );
};
