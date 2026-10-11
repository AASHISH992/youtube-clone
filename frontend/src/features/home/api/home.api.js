import api from "../../../lib/axios.js";


async function getHomeFeedApi() {
    const response = await api.get('/videos/');
    return response.data;
}

export { getHomeFeedApi };
