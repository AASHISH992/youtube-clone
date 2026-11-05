import {
  getCommentApi,
  addCommentApi,
  deleteCommentApi,
  updateCommentApi,
} from "../api/comment.api.js";
import { useState, useEffect } from "react";
import { useAuthStore } from "../../auth/store/authStore.js";

function useComment(videoId) {
  const [comments, setComments] = useState({ docs: [], totalDocs: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await getCommentApi(videoId);
        setComments(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchComments();
  }, [videoId]);

  async function addComment(videoId, comment) {
    try {
      const response = await addCommentApi(videoId, comment);

      const currentUser = useAuthStore.getState().user;

      const newCommentWithUser = {
        ...response.data,
        username: currentUser?.username || "You",
        avatar: currentUser?.avatar,
      };

      setComments((prev) => ({
        ...prev,
        docs: [newCommentWithUser, ...(prev.docs || [])],
        totalDocs: prev.totalDocs + 1,
      }));
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteComment(commentId) {
    try {
      await deleteCommentApi(commentId);
      setComments((prev) => ({
        ...prev,
        docs: prev.docs.filter((comment) => comment._id !== commentId),
        totalDocs: Math.max(0, prev.totalDocs - 1),
      }));
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateComment(commentId, newContent) {
    try {
      const response = await updateCommentApi(commentId, newContent);
      setComments((prev) => ({
        ...prev,
        docs: prev.docs.map((comment) =>
          comment._id === commentId
            ? { ...comment, content: response.data.content, updatedAt: new Date() }
            : comment,
        ),
      }));
    } catch (err) {
      setError(err.message);
    }
  }

  return {
    comments,
    isLoading,
    error,
    addComment,
    deleteComment,
    updateComment,
  };
}

export { useComment };
