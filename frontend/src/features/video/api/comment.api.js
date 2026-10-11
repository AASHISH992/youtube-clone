import api from "../../../lib/axios.js";

async function getCommentApi(videoId) {
  const response = await api.get(`/comments/video/${videoId}`);
  return response.data;
}

async function addCommentApi(videoId, content) {
  const response = await api.post(`/comments/video/${videoId}`, { content });
  return response.data;
}

async function deleteCommentApi(commentId) {
  const response = await api.delete(`/comments/${commentId}`);
  return response.data;
}

async function updateCommentApi(commentId, content) {
  const response = await api.patch(`/comments/${commentId}`, { content });
  return response.data;
}

export { getCommentApi, addCommentApi, deleteCommentApi, updateCommentApi };
