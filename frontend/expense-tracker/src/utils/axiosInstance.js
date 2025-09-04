import axios from 'axios';
import { BASE_URL } from './apiPaths';


const axiosInstance = axios.create({
  baseURL: BASE_URL,    
  timeout: 10000, // Request timeout
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
});

//Requesting Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // You can handle specific status codes here
            if (error.response.status === 401) {
                // Handle unauthorized access, e.g., redirect to login
                window.location.href = '/login';
            }else if (error.response.status === 403) {
                // Handle forbidden access
                alert("You don't have permission to access this resource.");
            }else if (error.response.status === 500) {
                // Handle server errors
                alert("A server error occurred. Please try again later.");
            }else if (error.code==='ECONNABORTED' ) {
                alert("Request timed out.");
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;