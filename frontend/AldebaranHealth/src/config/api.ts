import type { AxiosInstance } from "axios";
import axios from "axios";

const BASE_API_URL = "http://localhost:8080";

const api: AxiosInstance = axios.create({
    baseURL: BASE_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 10000,
    withCredentials: true,
});

api.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem("jwtToken");

        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }

        console.log("🚀 REQUEST:", {
            method: config.method?.toUpperCase(),
            url: config.url,
            data: config.data,
            headers: config.headers
        });

        return config;
    }, 
    (error) => {

        console.error(error.request?.data?.message || "❌ REQUEST: Failed to setting up jwt token")

        return error;
    }
)


api.interceptors.response.use(
    (response) => {
        console.log("✅ RESPONSE SUCCESS:");
        console.log("- Status:", response.status);
        console.log("- Data:", response.data);
        console.log("- URL:", response.config.url);
        
        return response;
    },
    (error) => {
        const status = error?.response?.status;
        const errorData = error?.response?.data;

        console.log("❌ RESPONSE ERROR DEBUG:");
        console.log("- Status:", status);
        console.log("- Error Data:", errorData);
        console.log("- Request URL:", error.config?.url);
        console.log("- Request Method:", error.config?.method);
        console.log("- Full Error:", error);

        switch (status) {
            case 401:
                console.error("Unauthorized Access!");
                localStorage.removeItem("jwtToken");
                localStorage.removeItem("user");
                break;
            case 403:
                console.error("Forbidden - Insufficient Permission");
                console.error("- This usually means:");
                console.error("  1. You don't own this resource");
                console.error("  2. Your JWT token is invalid/expired");
                console.error("  3. The endpoint doesn't exist");
                console.error("  4. Missing required permissions");
                break;
            case 404:
                console.error("Not found - Endpoint doesn't exist");
                console.error("- Check if the URL path is correct");
                break;
            case 422:
                console.error("Validation Error:");
                console.error("- Error details:", errorData);
                break;
            case 429:
                console.error("Rate Limited - Too many requests");
                break;
            case 500:
                console.error("Server Error - Something went wrong on the server");
                break;
            default:
                console.error(`HTTP Status Error: ${status}`);
        }

        return Promise.reject(error);
    }
);

export default api;