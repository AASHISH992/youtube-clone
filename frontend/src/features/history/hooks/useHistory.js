import { getHistoryApi } from "../api/history.api.js";
import { useState, useEffect } from "react";
import { useAuth } from "../../auth/hooks/useAuth.js";

function useHistory() {
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user?._id) {
      setIsLoading(false);
      return;
    }

    async function fetchHistory() {
      try {
        setIsLoading(true);
        const res = await getHistoryApi();
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

    fetchHistory();
  }, [user?._id]);

  return {
    history,
    isLoading,
    error,
  };
}

export { useHistory };
