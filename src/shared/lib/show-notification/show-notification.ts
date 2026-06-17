import { createEffect } from 'effector';

import { showNotification } from '@mantine/notifications';

type FullNotificationData = Parameters<typeof showNotification>[0];
type ShortNotificationData = Pick<FullNotificationData, 'title' | 'message'>;

export const showNotificationFx = createEffect<FullNotificationData, void>(
  (notificationData) => {
    showNotification(notificationData);
  },
);

export const showSuccessNotificationFx = createEffect<
  ShortNotificationData,
  void
>((notificationData) => {
  showNotification({
    ...notificationData,
    color: 'green',
  });
});

export const showErrorNotificationFx = createEffect<
  ShortNotificationData,
  void
>((notificationData) => {
  showNotification({
    ...notificationData,
    color: 'red',
  });
});

const DEFAULT_ERROR_MESSAGE_BY_TYPE = {
  somethingWentWrong: 'Что-то пошло не так',
  tryAgain: 'Произошло ошибка. Попробуйте ещё раз',
};

export const showDefaultErrorNotificationFx = createEffect<
  {
    type: keyof typeof DEFAULT_ERROR_MESSAGE_BY_TYPE;
  },
  void
>(({ type }) => {
  showNotification({
    message: DEFAULT_ERROR_MESSAGE_BY_TYPE[type],
    color: 'red',
  });
});
