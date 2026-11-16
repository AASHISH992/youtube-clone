import { getHomeFeedApi } from "../api/home.api.js";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function useVideos() {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    async function fetchVideos() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await getHomeFeedApi(query);
        setVideos(response.data.docs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVideos();
  }, [query]);
  return { videos, isLoading, error };
}

export { useVideos };
