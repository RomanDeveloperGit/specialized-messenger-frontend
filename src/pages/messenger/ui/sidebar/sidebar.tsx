import { useUnit } from 'effector-react';

import { Stack } from '@mantine/core';

import { initMessengerPageFx } from '../../model/register-page-side-effects/init-messenger-page.effect';
import { ConversationList } from './conversation-list';
import { Header } from './header';

export const Sidebar = () => {
  const [isInitMessengerPending] = useUnit([initMessengerPageFx.pending]);

  if (isInitMessengerPending) return 'Загрузка...';

  return (
    <Stack
      gap={0}
      display={'flex'}
      h="100%"
      bg="dark.8"
      style={{
        borderRight: '1px solid var(--mantine-color-dark-6)',
      }}
    >
      <Header />
      <ConversationList />
    </Stack>
  );
};
