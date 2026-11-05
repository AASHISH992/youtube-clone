import api from "../../../lib/axios.js";

async function getUserWatchHistoryApi() {
  const res = await api.get("/users/watch-history");
  return res.data;
}

export {getUserWatchHistoryApi}
