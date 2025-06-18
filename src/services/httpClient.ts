import axios from 'axios'

// Register Axios instance
export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000
})

// Add a response interceptor handler for global error handling
httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('API Error:', err)
    return Promise.reject(err)
  }
)