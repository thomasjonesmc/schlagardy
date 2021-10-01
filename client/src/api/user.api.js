import axios from "./axios";

export const getAllUsers = () => axios.get("/users");

export const getUserById = (id) => axios.get(`/users/${id}`);

export const loginUser = (user) => axios.post("/users/login", user);

export const registerUser = (user) => axios.post("/users/register", user);

export const logoutUser = () => axios.post("/users/logout");

export const refreshAccessToken = () => axios.post("/users/refresh");

export const getMe = (accessToken) => {
    return axios.get("/users/me", {
        authorization: `Bearer ${accessToken}`
    });
}



const userApi = {
    getAllUsers,
    getUserById,
    loginUser,
    registerUser,
    logoutUser,
    refreshAccessToken,
    getMe
}

export default userApi;