import api from "../../../lib/axios.js";

async function getHomeFeedApi(query = "") {
  const response = await api.get("/videos/", {
    params: query ? { query } : {},
  });
  return response.data;
}

export { getHomeFeedApi };
