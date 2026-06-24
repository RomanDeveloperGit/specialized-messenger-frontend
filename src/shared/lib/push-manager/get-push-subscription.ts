import { getServiceWorkerRegistration } from '@/shared/service-worker';

export const getPushSubscription = async () => {
  const serviceWorkerRegistration = await getServiceWorkerRegistration();

  if (!serviceWorkerRegistration) {
    return null;
  }

  const subscription =
    await serviceWorkerRegistration.pushManager.getSubscription();

  return subscription;
};
