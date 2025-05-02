import axios from 'axios';
import { DEFAULT_WORKER_ID as ENV_WORKER_ID } from 'react-native-dotenv';

const BASE_URL = 'https://test.swipejobs.com/api';

export const DEFAULT_WORKER_ID = ENV_WORKER_ID;

// Create an axios instance with default configuration
const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to handle common tasks
apiClient.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle common responses
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle API errors here
        return Promise.reject(error);
    }
);

export default apiClient;