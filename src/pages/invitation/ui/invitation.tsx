import { useUnit } from 'effector-react';

import { Center, Paper, Stack } from '@mantine/core';

import type { ReactPageWithSideEffects } from '@/shared/lib/react-page-with-side-effect';

import { $hasInvitationError } from '@/entities/invitation';

import { AcceptInvitation } from '@/features/accept-invitation';

import { registerPageSideEffects } from '../model/register-page-side-effects';
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
          <AcceptInvitation />
        </Stack>
      </Paper>
    </Center>
  );
};

InvitationPage.registerPageSideEffects = registerPageSideEffects;
