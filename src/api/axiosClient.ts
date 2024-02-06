// axiosClient.ts
import axios from 'axios';
import { environment } from "../data/global";

const axiosClient =  axios.create({
  baseURL: `${environment.URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
});


// Request interceptor for API calls
axiosClient.interceptors.request.use(async (config) => {
  // You can add token or other request modifications here
  return config;
});

// Response interceptor for API calls
axiosClient.interceptors.response.use((response) => {
  return response.data;
}, (error) => {
  // Handle errors
  return Promise.reject(error);
});

export default axiosClient;
