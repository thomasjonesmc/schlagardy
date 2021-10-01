// A wrapper around axios for more simplified api calls
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api/",
    withCredentials: true
});

// data is request body
const axiosRequest = async (method, url, data, headers) => {
    return axiosInstance({
        method, url, data, headers
    })
    .then(res => {
        return Promise.resolve(res.data);
    })
    .catch(err => {
        if (err.response?.data?.error) {
            return Promise.reject(err.response.data.error);
        }
        return Promise.reject("Unknown Error");
    })
}

const get   = (url, headers)       => axiosRequest("get", url, undefined, headers);
const del   = (url, data, headers) => axiosRequest("delete", url, data, headers);
const post  = (url, data, headers) => axiosRequest("post", url, data, headers);
const put   = (url, data, headers) => axiosRequest("put", url, data, headers);
const patch = (url, data, headers) => axiosRequest("patch", url, data, headers);

const axiosWrapper = {
    get, delete: del, post, put, patch
}

export default axiosWrapper;