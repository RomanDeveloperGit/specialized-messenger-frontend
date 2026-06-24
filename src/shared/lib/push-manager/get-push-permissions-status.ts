import { getServiceWorkerRegistration } from '@/shared/service-worker';

type PushPermissionsStatus = {
  supported: boolean;
  permission: NotificationPermission;
};

export const getPushPermissionsStatus =
  async (): Promise<PushPermissionsStatus> => {
    const supported =
      'Notification' in globalThis &&
      'PushManager' in globalThis &&
      'serviceWorker' in navigator;

    if (!supported) {
      return { supported: false, permission: 'denied' };
    }

    const serviceWorkerRegistration = await getServiceWorkerRegistration();

    if (!serviceWorkerRegistration) {
      return { supported, permission: 'denied' };
    }

    const permission = Notification.permission;

    return { supported, permission };
  };
