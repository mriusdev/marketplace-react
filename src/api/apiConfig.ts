import axios, { AxiosError, AxiosRequestConfig } from "axios";
import AuthService from "../auth/AuthService";
import { refreshToken } from "./auth/refreshAPI";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})

let privateInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
})


privateInstance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.headers = config.headers ?? {}

    // if header is not present, then it's the first attempt
    if (!config?.headers['Authorization']) {
      config.headers['Authorization'] = `Bearer ${AuthService.useGetAccessToken()}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
privateInstance.interceptors.response.use(
  (response) => {
    // AuthService.useRegisterAuth(response.data?.access_token)
    // TODO: rethink if we should actually set the access_token on each response
    // as it might be unnecessary
    return response
  },
  async (error) => {
    const prevRequest = error?.config
    // prevRequest?.sent is a custom property preventing us from ending up in a loop
    // basically if we get a 401 error status on the first try
    // then execute this
    console.log('%c intercepting the response', 'color: #277BC0; font-weight: bold');
    
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      // debugger
      prevRequest.sent = true
      // debugger      
      // useRefreshHook is in our dependency array, so calling it
      // might cause the whole statement to stop and rerun the whole
      // use effect imo
      const {access_token} = await refreshToken()
      // debugger
      prevRequest.headers['Authorization'] = `Bearer ${access_token}`
      console.log('access token is', access_token);
      
      // updated the request with a refresh token so we return the whole
      // config back
      console.log('%c useRefreshHook ran but we continued with steps that we described', 'color: green');
      
      return privateInstance({
        ...prevRequest,
        headers: {
          ...prevRequest.headers,
          Authorization: `Bearer ${access_token}`
        },
        sent: true
      })
    }
    return Promise.reject(error)
  }
)

export {
  instance as api,
  privateInstance as privateAPI
}