export const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

export const endpoint = (path) => `${VITE_API_URL}${path}`
