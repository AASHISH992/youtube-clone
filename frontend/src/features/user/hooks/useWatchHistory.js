import { getUserWatchHistoryApi } from "../api/user.api.js";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth.js";

function useWatchHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?._id) {
      setIsLoading(false);
      return;
    }

    async function fetchWatchHistory() {
      try {
        setIsLoading(true);
        const res = await getUserWatchHistoryApi();
        setHistory(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch watch history",
        );
      } finally {
        setIsLoading(false);
      }
    }

    fetchWatchHistory();
  }, [user?._id]);

  return {
    history,
    isLoading,
    error,
  };
}

export { useWatchHistory };
