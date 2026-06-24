import { registerServiceWorker } from './register-service-worker';

export const getServiceWorkerRegistration = async () => {
  return (
    globalThis.__serviceWorkerRegistration || (await registerServiceWorker())
  );
};
