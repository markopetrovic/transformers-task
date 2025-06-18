import { httpClient } from './httpClient'

class HttpService {
  get<T>(url: string, config = {}) {
    return httpClient.get<T>(url, config)
  }

  post<T>(url: string, data: any, config = {}) {
    return httpClient.post<T>(url, data, config)
  }

  put<T>(url: string, data: any, config = {}) {
    return httpClient.put<T>(url, data, config)
  }

  delete<T>(url: string, config = {}) {
    return httpClient.delete<T>(url, config)
  }
}

export default new HttpService()