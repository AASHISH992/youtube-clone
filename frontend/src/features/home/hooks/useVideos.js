import { getHomeFeedApi } from "../api/home.api.js";
import { useState, useEffect } from "react";

function useVideos() {
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchVideos() {

            try{
                const response = await getHomeFeedApi();
                setVideos(response.data.docs);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        }
        fetchVideos();
    }, []);
    return { videos, isLoading, error };
}

export { useVideos };
