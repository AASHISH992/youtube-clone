import { useState, useEffect } from "react";
import {
  getPlaylistsByUserApi,
  getPlaylistApi,
  createPlaylistApi,
  updatePlaylistApi,
  deletePlaylistApi,
  addVideoToPlaylistApi,
  removeVideoFromPlaylistApi,
} from "../api/playlist.api.js";
import { useAuth } from "../../auth/hooks/useAuth.js";
import { useNavigate } from "react-router-dom";

function usePlaylist(playlistId) {
  const [playlists, setPlaylists] = useState([]);
  const [playlist, setPlaylist] = useState(null);
  const [video, setVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (playlistId) {
      async function fetchSinglePlaylist() {
        try {
          setIsLoading(true);
          const response = await getPlaylistApi(playlistId);
          setPlaylist(response.data);
        } catch (err) {
          setError(err.message || "Failed to fetch playlist");
        } finally {
          setIsLoading(false);
        }
      }
      fetchSinglePlaylist();
      return;
    }

    // 1. Fetch user's playlists
    if (!user?._id) {
      setIsLoading(false);
      return;
    }

    async function fetchPlaylist() {
      try {
        setIsLoading(true);
        const response = await getPlaylistsByUserApi(user._id);
        setPlaylists(response.data?.docs || response.data || []);
      } catch (err) {
        setError(err.message || "Failed to fetch playlists");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPlaylist();
  }, [user?._id]);

  async function createPlaylist(data) {
    try {
      setIsLoading(true);
      const response = await createPlaylistApi(data);
      setPlaylists((prev) => [response.data, ...(prev || [])]);
      navigate("/feed/you");
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message || "Failed to Create Playlist");
    } finally {
      setIsLoading(false);
    }
  }
  async function updatePlaylist(targetId, payload) {
    const id = typeof targetId === "string" ? targetId : playlistId;
    const updateData = typeof targetId === "string" ? payload : targetId;

    try {
      setIsLoading(true);
      const response = await updatePlaylistApi(id, updateData);
      const updatedPlaylist = response.data;

      setPlaylist((prev) =>
        prev ? { ...prev, ...updatedPlaylist } : updatedPlaylist,
      );
      setPlaylists((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, ...updatedPlaylist } : item,
        ),
      );
      return { success: true, data: updatedPlaylist };
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to update playlist",
      );
      return { success: false, error: err };
    } finally {
      setIsLoading(false);
    }
  }

  async function deletePlaylist(targetId) {
    const id = targetId || playlistId;
    if (!id) return;

    try {
      setIsLoading(true);
      await deletePlaylistApi(id);

      setPlaylists((prev) => prev.filter((p) => p._id !== id));
      setPlaylist(null);

      navigate("/feed/you");
      return { success: true, data: response.data };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to delete playlist";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }

  async function addVideo(data) {
    try {
      setIsLoading(true);
      const response = await addVideoToPlaylistApi(data);
      setVideo((prev) => [response.data, ...(prev || [])]);
      navigate("/feed/you");
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message || "Failed to Create Playlist");
    } finally {
      setIsLoading(false);
    }
  }
  async function removeVideo(data) {
    try {
      setIsLoading(true);
      const response = await removeVideoFromPlaylistApi(data);
      setVideo((prev) => [response.data, ...(prev || [])]);
      navigate("/feed/you");
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.message || "Failed to Create Playlist");
    } finally {
      setIsLoading(false);
    }
  }

  return {
    playlists,
    playlist,
    isLoading,
    error,
    createPlaylist,
    updatePlaylist,
    deletePlaylist,
    addVideo,
    removeVideo,
  };
}

export default usePlaylist;
