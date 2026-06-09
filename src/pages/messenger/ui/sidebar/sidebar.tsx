import { Stack } from '@mantine/core';

import { ConversationListFacade } from './conversation-list-facade/conversation-list-facade';
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
      <ConversationListFacade />
    </Stack>
  );
};
