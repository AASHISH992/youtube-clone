import api from "../../../lib/axios.js";

async function getHistoryApi() {
  const res = await api.get("/users/watch-history");
  return res.data;
}

export {getHistoryApi}
