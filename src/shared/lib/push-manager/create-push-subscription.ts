import { getServiceWorkerRegistration } from '@/shared/service-worker';

import { getPushPermissionsStatus } from './get-push-permissions-status';

export const createPushSubscription = async (vapidPublicKey: string) => {
  const pushPermissionsStatus = await getPushPermissionsStatus();

  if (
    !pushPermissionsStatus.supported ||
    pushPermissionsStatus.permission === 'denied'
  ) {
    return null;
  }

  if (pushPermissionsStatus.permission === 'default') {
    const result = await Notification.requestPermission();

    if (result !== 'granted') {
      return null;
    }
  }

  const serviceWorkerRegistration = (await getServiceWorkerRegistration())!;
  const hasSubscription =
    await serviceWorkerRegistration.pushManager.getSubscription();

  if (hasSubscription) {
    return null;
  }

  const subscription = await serviceWorkerRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: vapidPublicKey,
  });

  return subscription;
};
