import { Notifications } from '@mantine/notifications';

import '@mantine/notifications/styles.css';

export const NotificationManager = () => {
  return (
    <Notifications
      position="top-right"
      limit={6}
      autoClose={5000}
      zIndex={1000}
    />
  );
};
