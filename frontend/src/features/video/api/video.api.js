import api from "../../../lib/axios.js";

async function getVideosByIdApi(videoId) {
  const response = await api.get(`/videos/${videoId}`);
  return response.data;
}

async function publishVideoApi(title, description, thumbnail, videoFile) {
  const response = await api.post(`/videos/${videoId}/publish`, title, description, thumbnail, videoFile);
  return response.data;
}

async function deleteVideoApi(videoId) {
  const response = await api.delete(`/videos/${videoId}`);
  return response.data;
}

async function updateVideoDetailsApi(videoId,title, description ) {
  const response = await api.patch(`/videos/${videoId}/details`, title, description);
  return response.data;
}

async function updateVideoThumbnailApi(videoId, thumbnail) {
  const response = await api.patch(`/videos/${videoId}/thumbnail`, thumbnail);
  return response.data;
}






export { getVideosByIdApi, publishVideoApi, deleteVideoApi, updateVideoDetailsApi, updateVideoThumbnailApi };
