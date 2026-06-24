import { getPushSubscription } from './get-push-subscription';

export const deletePushSubscription =
  async (): Promise<PushSubscription | null> => {
    const subscription = await getPushSubscription();

    if (!subscription) {
      return null;
    }

    const isUnsubscribed = await subscription.unsubscribe();

    if (!isUnsubscribed) {
      return null;
    }

    return subscription;
  };
