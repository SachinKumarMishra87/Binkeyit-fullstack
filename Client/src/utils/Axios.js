import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: baseURL,
    withCredentials: true
});

// Sending access token in the header
Axios.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Extend the life of access token using refresh token
Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                try {
                    const newAccessToken = await refreshAcessToken(refreshToken);
                    if (newAccessToken) {
                        localStorage.setItem("accessToken", newAccessToken);
                        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                        return Axios(originalRequest);
                    }
                } catch (err) {
                    console.error("Token Refresh Failed:", err);
                }
            }
        }

        return Promise.reject(error);
    }
);

const refreshAcessToken = async (refreshToken) => {
    try {
        const response = await axios.post(
            SummaryApi.refreshToken.url,
            {},
            {
                headers: { Authorization: `Bearer ${refreshToken}` }
            }
        );
        return response.data?.data?.accessToken;
    } catch (error) {
        console.error("Error refreshing access token:", error);
        return null;
    }
};

export default Axios;
