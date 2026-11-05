import {
  getSubscriptionsApi,
  getSubscriberApi,
  toggleSubscriptionApi,
  getSubscriberCountApi,
  getSubscriberStatusApi,
} from "../api/subscription.api.js";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../auth/store/authStore.js";

function useSubscription({ channelId }) {
  const [isSubscribe, setIsSubscribe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (channelId) {
      fetchSubscriberCount(channelId);
    }

    async function fetchSubscribeStatus() {
      if (!isLoggedIn) {
        setIsSubscribe(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        if (channelId) {
          const response = await getSubscriberStatusApi(channelId);
          setIsSubscribe(response.data.isSubscribe);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (channelId) fetchSubscribeStatus();
  }, [channelId, isLoggedIn]);

  async function subscribe() {
    try {
      await toggleSubscriptionApi(channelId);
      setIsSubscribe((prev) => !prev);
      setSubscriberCount((prev) =>
        isSubscribe ? Math.max(0, prev - 1) : prev + 1,
      );
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchSubscriberCount(channelId) {
    try {
      const response = await getSubscriberCountApi(channelId);
      setSubscriberCount(response.data.subscriberCount);
    } catch (err) {
      setError(err.message);
    }
  }
  return {
    isSubscribe,
    isLoading,
    error,
    subscribe,
    subscriberCount,
    fetchSubscriberCount,
  };
}

export { useSubscription };
