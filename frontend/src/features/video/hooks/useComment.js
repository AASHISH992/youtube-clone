import {
  getCommentApi,
  addCommentApi,
  deleteCommentApi,
  updateCommentApi,
} from "../api/comment.api.js";
import { useState, useEffect } from "react";

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
      setComments((prev) => ({
        ...prev,
        docs: [response.data, ...(prev.docs || [])],
        totalDocs: prev.totalDocs + 1,
      }));
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteComment(commentId) {
    try {
      const response = await deleteCommentApi(commentId);
      setComments(response.data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function updateComment(commentId, comment) {
    try {
      const response = await updateCommentApi(commentId, comment);
      setComments(response.data);
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
