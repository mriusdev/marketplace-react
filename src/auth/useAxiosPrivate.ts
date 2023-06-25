import { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect } from "react"
import { privateAPI } from "../api/apiConfig"
import useRefresh from "../query-hooks/auth/useRefresh";
import AuthService from "./AuthService";

export default function useAxiosPrivate() {
  const { mutateAsync, isError, isLoading, data } = useRefresh()
  const useRefreshHook = async () => {
    try {
      const data = await mutateAsync()
      return data?.access_token
    } catch (error: AxiosError | any) {
      console.log('caught useRefresh errors', error);
    }
  }
  useRefreshHook()
  useEffect(() => {
    console.log('private axios mount action');

    const requestIntercept = privateAPI.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        config.headers = config.headers ?? {}

        // if header is not present, then it's the first attempt
        if (!config?.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${AuthService.getAuthDetailsFromLocalStorage()}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    const responseIntercept = privateAPI.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config
        // prevRequest?.sent is a custom property preventing us from ending up in a loop
        // basically if we get a 403 error status on the first try
        // then execute this
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true
          // useRefreshHook is in our dependency array, so calling it
          // might cause the whole statement to stop and rerun the whole
          // use effect imo
          const newAccessToken = await useRefreshHook()
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
          // updated the request with a refresh token so we return the whole
          // config back
          console.log('%c useRefreshHook ran but we continued with steps that we described', 'color: green');
          
          return privateAPI(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    // on cleanup ( unmount ) remove our interceptors as they might 'pile up'
    return () => {
      privateAPI.interceptors.request.eject(requestIntercept)
      privateAPI.interceptors.response.eject(responseIntercept)
      console.log('%c private axios unmount action', 'color: red');
      
    }
  }, [useRefreshHook])
  

  return privateAPI;
}
