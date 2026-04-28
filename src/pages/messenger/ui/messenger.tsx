import { useUnit } from 'effector-react';

import { Box, Center, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

import type { ReactPageWithSideEffects } from '@/shared/lib/react-page-with-side-effect';

import { $activeConversation } from '../model/active-conversation/active-conversation.store';
import { registerPageSideEffects } from '../model/register-page-side-effects/register-page-side-effects';
import { ActiveConversation } from './active-conversation';
import { ConversationsSidebar } from './conversations-sidebar';

export const MessengerPage: ReactPageWithSideEffects = () => {
  const [activeConversation] = useUnit([$activeConversation]);
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <Box h="100vh" bg="dark.9" style={{ display: 'flex', overflow: 'hidden' }}>
      <Box
        style={{
          width: isMobile ? '100%' : 320,
          flexShrink: 0,
          display: isMobile && activeConversation ? 'none' : 'flex',
          flexDirection: 'column',
        }}
      >
        <ConversationsSidebar />
      </Box>
      <Box
        flex={1}
        style={{
          display: isMobile && !activeConversation ? 'none' : 'flex',
          flexDirection: 'column',
          minWidth: 0,
        }}
      >
        {activeConversation ? (
          <ActiveConversation />
        ) : (
          <Center flex={1}>
            <Stack align="center" gap={0}>
              <Box
                mb={14}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: '#1d2a1d',
                  border: '1px solid #2a3d2a',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3C7.03 3 3 6.8 3 11.5c0 2.13.83 4.07 2.2 5.56L4 21l4.7-1.46A9.9 9.9 0 0 0 12 20c4.97 0 9-3.8 9-8.5S16.97 3 12 3Z"
                    stroke="#4a9958"
                    strokeWidth={1.6}
                    strokeLinejoin="round"
                  />
                  <circle cx="9" cy="11.5" r="1.1" fill="#4a9958" />
                  <circle cx="12" cy="11.5" r="1.1" fill="#4a9958" />
                  <circle cx="15" cy="11.5" r="1.1" fill="#4a9958" />
                </svg>
              </Box>
              <Text size="sm" fw={500} c="gray.3" mb={6}>
                Выберите чат
              </Text>
              <Text size="xs" c="dark.3" ta="center" maw={160} lh={1.65}>
                Нажмите на чат слева, чтобы открыть переписку
              </Text>
            </Stack>
          </Center>
        )}
      </Box>
    </Box>
  );
};

MessengerPage.registerPageSideEffects = registerPageSideEffects;
