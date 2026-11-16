import { getChannelStatsApi, getChannelVideosApi } from "../api/channel.api.js";
import { useState, useEffect } from "react";

function useChannel(channelId) {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({});

  useEffect(() => {
    async function fetchVideos() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getChannelVideosApi(channelId);
        setVideos(response.data.docs);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();
  }, [channelId]);

  useEffect(() => {
    async function fetchChannelStats() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getChannelStatsApi(channelId);
        setStats(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchChannelStats();
  }, [channelId]);
  return { videos, isLoading, error, stats };
}

export { useChannel };
