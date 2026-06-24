import { useUnit } from 'effector-react';
import { IconBell, IconBellOff } from '@tabler/icons-react';

import { Tooltip, UnstyledButton } from '@mantine/core';

import {
  $isPushSubscriptionActived,
  actualizePushSubscriptionWithSyncFx,
} from '@/entities/push-subscription';

import { subscribeToPushFx } from '../model/subscribe-to-push.effect';
import { unsubscribeFromPushFx } from '../model/unsubscribe-from-push.effect';

export const PushSubscriptionSettings = () => {
  const [
    isPushSubscriptionActived,
    isSubscribeToPushPending,
    isUnsubscribeFromPushPending,
    isActualizingPushSubscriptionPending,
  ] = useUnit([
    $isPushSubscriptionActived,
    subscribeToPushFx.pending,
    unsubscribeFromPushFx.pending,
    actualizePushSubscriptionWithSyncFx.pending,
  ]);

  const handleClick = () => {
    if (isPushSubscriptionActived) {
      unsubscribeFromPushFx();
    } else {
      subscribeToPushFx();
    }
  };

  const isPending =
    isSubscribeToPushPending ||
    isUnsubscribeFromPushPending ||
    isActualizingPushSubscriptionPending;

  return (
    <Tooltip
      label={
        isPushSubscriptionActived
          ? 'Выключить уведомления'
          : 'Включить уведомления'
      }
      position="bottom"
      withArrow
    >
      <UnstyledButton
        p={7}
        disabled={isPending}
        onClick={handleClick}
        aria-label="Переключить уведомления"
        style={(theme) => ({
          'borderRadius': theme.radius.md,
          'color': isPushSubscriptionActived
            ? theme.colors.dark[2]
            : theme.colors.red[5],
          'display': 'flex',
          'alignItems': 'center',
          'transition': 'background 0.15s, color 0.15s',
          '&:hover': {
            background: theme.colors.dark[6],
            color: isPushSubscriptionActived
              ? theme.colors.green[5]
              : theme.colors.red[4],
          },
        })}
      >
        {isPushSubscriptionActived ? (
          <IconBell size={16} stroke={1.7} />
        ) : (
          <IconBellOff size={16} stroke={1.7} />
        )}
      </UnstyledButton>
    </Tooltip>
  );
};
