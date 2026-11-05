import {
  getVideoLikeStatusApi,
  getCommentLikeStatusApi,
  likeVideoApi,
  likeCommentApi,
  getVideoLikeCountApi,
  getCommentLikeCountApi,
} from "../api/like.api.js";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../auth/store/authStore.js";
import { useNavigate } from "react-router-dom";

function useLike({ videoId, commentId } = {}) {
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (videoId) {
      fetchVideoLikeCount(videoId);
    }
    if (commentId) {
      fetchCommentLikeCount(commentId);
    }

    async function fetchLikeStatus() {
      if (!isLoggedIn) {
        setIsLiked(false);
        return;
      }
      setIsLoading(true);
      setError(null);

      try {
        if (videoId) {
          const response = await getVideoLikeStatusApi(videoId);
          setIsLiked(response.data.isLiked);
        }

        if (commentId) {
          const response = await getCommentLikeStatusApi(commentId);
          setIsLiked(response.data.isLiked);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (videoId || commentId) fetchLikeStatus();
  }, [videoId, commentId, isLoggedIn]);

  async function like() {
    try {
      if (!isLoggedIn) {
        navigate("/signin");
        return;
      }
      if (videoId) {
        await likeVideoApi(videoId);
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => (isLiked ? Math.max(0, prev - 1) : prev + 1));
      }

      if (commentId) {
        await likeCommentApi(commentId);
        setIsLiked((prev) => !prev);
        setLikeCount((prev) => (isLiked ? Math.max(0, prev - 1) : prev + 1));
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchVideoLikeCount(videoId) {
    try {
      const response = await getVideoLikeCountApi(videoId);
      setLikeCount(response.data.likeCount);
    } catch (err) {
      setError(err.message);
    }
  }

  async function fetchCommentLikeCount(commentId) {
    try {
      const response = await getCommentLikeCountApi(commentId);

      setLikeCount(response.data.likeCount);
    } catch (err) {
      setError(err.message);
    }
  }

  return {
    isLiked,
    isLoading,
    error,
    like,
    likeCount,
    fetchVideoLikeCount,
    fetchCommentLikeCount,
  };
}
export { useLike };
