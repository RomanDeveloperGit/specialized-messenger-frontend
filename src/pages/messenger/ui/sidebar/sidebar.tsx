import { Stack } from '@mantine/core';

import { ConversationList } from './conversation-list/conversation-list';
import { Header } from './header';

export const Sidebar = () => {
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
