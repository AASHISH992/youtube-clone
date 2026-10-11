import api from "../../../lib/axios.js";

async function registerApi(formData) {
    const response = await api.post('/users/register', formData, {
        headers: { "Content-Type":'multipart/form-data' } ,
    });
    return response.data;
};

async function loginApi(credentials) {
    const response = await api.post('/users/login', credentials);
    return response.data;
};

async function logoutApi() {
    const response = await api.post('/users/logout');
    return response.data;
}

async function getCurrentUserApi() {
    const response = await api.get('/users/current-user');
    return response.data;
}

export { registerApi, loginApi, logoutApi, getCurrentUserApi };


