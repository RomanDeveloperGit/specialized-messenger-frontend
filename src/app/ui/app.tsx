import type { FC, ReactNode } from 'react';

import { useUnit } from 'effector-react';

import { LoadingOverlay, MantineProvider } from '@mantine/core';

import { $isAppVisible } from '../model';
import { ErrorBoundary } from './error-boundary';
import { NotificationManager } from './notification-manager';
import { theme } from './theme';

import '@mantine/core/styles.css';
import './styles.module.css';

export const App: FC<{ routerProvider: ReactNode }> = ({ routerProvider }) => {
  const isAppVisible = useUnit($isAppVisible);

  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <ErrorBoundary>
        {isAppVisible ? routerProvider : <LoadingOverlay visible={true} />}
        <NotificationManager />
      </ErrorBoundary>
    </MantineProvider>
  );
};
