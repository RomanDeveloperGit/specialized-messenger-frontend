import type { FC, ReactNode } from 'react';

import { MantineProvider } from '@mantine/core';

import { ErrorBoundary } from './error-boundary';
import { NotificationManager } from './notification-manager';
import { theme } from './theme';

import '@mantine/core/styles.css';
import './styles.module.css';

export const App: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <ErrorBoundary>
        {children}
        <NotificationManager />
      </ErrorBoundary>
    </MantineProvider>
  );
};
