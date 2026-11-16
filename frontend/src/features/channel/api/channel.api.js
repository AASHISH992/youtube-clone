import api from "../../../lib/axios.js";

async function getChannelStatsApi(channelId) {
  const response = await api.get(`/dashboard/${channelId}`);
  return response.data;
}

async function getChannelVideosApi(channelId) {
  const response = await api.get(`/dashboard/${channelId}/videos`);
  return response.data;
}

export { getChannelStatsApi, getChannelVideosApi };
