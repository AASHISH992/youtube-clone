import api from "../../../lib/axios.js";

async function getPlaylistsApi() {
  const { data } = await api.get("/playlists");
  return data;
}

async function getPlaylistsByUserApi(userId) {
  const { data } = await api.get(`/playlists/users/${userId}`);
  return data;
}

async function getPlaylistApi(playlistId) {
  const { data } = await api.get(`/playlists/${playlistId}`);
  return data;
}

async function createPlaylistApi(playlist) {
  const { data } = await api.post("/playlists", playlist);
  return data;
}
async function updatePlaylistApi(playlistId, payload) {
  const { data } = await api.patch(`/playlists/${playlistId}`, payload);
  return data;
}

async function deletePlaylistApi(playlistId) {
  const { data } = await api.delete(`/playlists/${playlistId}`);
  return data;
}

async function addVideoToPlaylistApi(playlistId, videoId) {
  const { data } = await api.post(`/playlists/${playlistId}/videos`, {
    videoId,
  });
  return data;
}

async function removeVideoFromPlaylistApi(playlistId, videoId) {
  const { data } = await api.delete(
    `/playlists/${playlistId}/videos/${videoId}`,
  );
  return data;
}

export {
  getPlaylistsApi,
  getPlaylistApi,
  getPlaylistsByUserApi,
  createPlaylistApi,
  deletePlaylistApi,
  addVideoToPlaylistApi,
  removeVideoFromPlaylistApi,
  updatePlaylistApi,
};
