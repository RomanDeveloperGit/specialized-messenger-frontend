import { useUnit } from 'effector-react';

import { Center, Paper, Stack } from '@mantine/core';

import type { ReactPageWithSideEffects } from '@/shared/lib/react-page-with-side-effect';

import { registerPageSideEffects } from '../model/register-page-side-effects';
import { InvitationAcceptance } from '../modules/invitation-acceptance';
import { $invitation, InvitationView } from '../modules/invitation-view';

export const InvitationPage: ReactPageWithSideEffects = () => {
  const [invitation] = useUnit([$invitation]);

  return (
    <Center h="100vh" bg="dark.9" p={10}>
      <Paper w={360} p="xl" radius="lg">
        <Stack gap="lg">
          <InvitationView />
          {invitation && <InvitationAcceptance invitation={invitation} />}
        </Stack>
      </Paper>
    </Center>
  );
};

InvitationPage.registerPageSideEffects = registerPageSideEffects;
