import axios from 'axios'

const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

const apiClient = axios.create({
  baseURL: VITE_API_URL, // Should be http://localhost:5000 (without /api/v1)
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to include auth token if present
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default apiClient
