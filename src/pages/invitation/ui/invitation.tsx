import { useUnit } from 'effector-react';

import { Center, Paper, Stack } from '@mantine/core';

import type { ReactPageWithSideEffects } from '@/shared/lib/react-page-with-side-effect';

import { $hasInvitationError } from '../model/invitation/invitation.store';
import { registerPageSideEffects } from '../model/register-page-side-effects';
import { InvitationAcceptance } from './invitation-acceptance';
import { InvitationError } from './invitation-error';
import { InvitationView } from './invitation-view';

export const InvitationPage: ReactPageWithSideEffects = () => {
  const [hasInvitationError] = useUnit([$hasInvitationError]);

  if (hasInvitationError) {
    return <InvitationError />;
  }

  return (
    <Center h="100vh" bg="dark.9" p={10}>
      <Paper w={360} p="xl" radius="lg">
        <Stack gap="lg">
          <InvitationView />
          <InvitationAcceptance />
        </Stack>
      </Paper>
    </Center>
  );
};

InvitationPage.registerPageSideEffects = registerPageSideEffects;
