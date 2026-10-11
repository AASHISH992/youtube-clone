import {
  getVideosByIdApi,
  publishVideoApi,
  deleteVideoApi,
  updateVideoDetailsApi,
  updateVideoThumbnailApi,
} from "../api/video.api.js";
import { useState, useEffect } from "react";

function useVideo(videoId) {
    const [video, setVideo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        if (!videoId) return;
        async function fetchVideos() {

            try{
                const response = await getVideosByIdApi(videoId);
                setVideo(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchVideos();
    }, []);
    return { video, isLoading, error };
}

export { useVideo };
