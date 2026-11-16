import api from "../../../lib/axios.js";

async function uploadApi(formData) {
  const response = await api.post("/videos/publish", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

async function editApi(id, data) {
  const response = await api.put(`/videos/${id}`, data);
  return response.data;
}

export { uploadApi, editApi };
