import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, // Important for cookie-based auth
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add CSRF token
api.interceptors.request.use(
    (config) => {
        // Get CSRF token from cookie
        const csrfToken = document.cookie
            .split('; ')
            .find(row => row.startsWith('csrftoken='))
            ?.split('=')[1];

        if (csrfToken && config.method !== 'get') {
            config.headers['X-CSRFToken'] = csrfToken;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle 401 (Unauthorized) - could redirect to login
            if (error.response.status === 401) {
                
            }
        }
        return Promise.reject(error);
    }
);

export default api;
