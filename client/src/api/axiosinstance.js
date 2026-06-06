const VITE_BACKEND_URL =
import.meta.env.VITE_BACKEND_URL;
import axios from "axios";

const api = axios.create({
  baseURL: VITE_BACKEND_URL,
  withCredentials: true,
});

// Add a global response interceptor
api.interceptors.response.use(
  (response) => {
    // Passes through successful responses normally
    return response;
  },
  (error) => {
    // Check if the backend returned a 401 Unauthorized status
    if (error.response && error.response.status === 401) {
      
      // Check to prevent infinite reload loops if they are already on the login page
      if (window.location.pathname !== "/admin/login") {
        console.warn("Session expired or unauthorized. Redirecting to login...");
        window.location.href = "/admin/login";
      }
    }
    
    // Always reject the promise so the specific component can still catch the error if needed
    return Promise.reject(error);
  }
);

export default api;