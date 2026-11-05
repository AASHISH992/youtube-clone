import api from "../../../lib/axios.js";

async function likeVideoApi(videoId) {
  const response = await api.post(`/likes/videos/${videoId}`);
  return response.data;
}

async function getVideoLikeCountApi(videoId) {
  const response = await api.get(`/likes/videos/${videoId}/count`);
  return response.data;
}
async function getCommentLikeCountApi(commentId) {
  const response = await api.get(`/likes/comments/${commentId}/count`);
  return response.data;
}

async function getVideoLikeStatusApi(videoId) {
  const response = await api.get(`/likes/videos/${videoId}/status`);
  return response.data;
}
async function getCommentLikeStatusApi(commentId) {
  const response = await api.get(`/likes/comments/${commentId}/status`);
  return response.data;
}

async function likeCommentApi(commentId) {
  const response = await api.post(`/likes/comments/${commentId}`);
  return response.data;
}

{
  /*
async function dislikeVideoApi(videoId) {
  const response = await api.delete(`/likes/video/${videoId}`);
  return response.data;
}
*/
}

export {
  likeVideoApi,
  likeCommentApi,
  getVideoLikeStatusApi,
  getCommentLikeStatusApi,
  getVideoLikeCountApi,
  getCommentLikeCountApi,
};
