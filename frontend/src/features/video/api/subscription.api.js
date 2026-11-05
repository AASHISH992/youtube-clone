import api from "../../../lib/axios.js";

async function getSubscriberApi(channelId) {
  const response = await api.get(`/subscriptions/${channelId}`);
  return response.data;
}

async function getSubscriberCountApi(channelId) {
  const response = await api.get(`/subscriptions/${channelId}/count`);
  return response.data;
}

async function getSubscriberStatusApi(channelId) {
  const response = await api.get(`/subscriptions/${channelId}/status`);
  return response.data;
}

async function getSubscriptionsApi() {
  const response = await api.get("/subscriptions");
  return response.data;
}

async function toggleSubscriptionApi(channelId) {
  const response = await api.patch(`/subscriptions/${channelId}`);
  return response.data;
}

export {
  getSubscriptionsApi,
  getSubscriberApi,
  toggleSubscriptionApi,
  getSubscriberCountApi,
  getSubscriberStatusApi,
};
