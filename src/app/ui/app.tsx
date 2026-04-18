import { ConfigProvider, theme } from 'antd';

import { AppRouter } from '../router/app-router';
import { ErrorBoundary } from './error-boundary/error-boundary';

import './app.module.css';

export const App = () => {
  return (
    <ErrorBoundary>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <AppRouter />
      </ConfigProvider>
    </ErrorBoundary>
  );
};
