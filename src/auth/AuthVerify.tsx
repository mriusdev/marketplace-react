import { AxiosError } from 'axios'
import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import useRefresh from '../query-hooks/auth/useRefresh'
import AuthService from './AuthService'
type Props = {}

export const AuthVerify = (props: Props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { mutateAsync, isLoading } = useRefresh()
  useEffect(() => {
    handleAuthVerify()  
  }, [location])

  const handleAuthVerify = async () => {
    const at = AuthService.useGetAccessToken();
    const oneMinuteAndAHalf = 15000;
    if (at) {
      const decodedJwt = parseJwt(at.access_token)
      // if we've 1 minute left, refetch at using refresh token
      const timeDifference = (decodedJwt.exp * 1000) - Date.now();
      if (timeDifference <= oneMinuteAndAHalf) {
        // call refresh token route and replace current at in localStorage
        try {
          const data = await mutateAsync()
          console.log('refresh token success', data);
          AuthService.useRegisterAuth(data?.access_token)
          
        } catch (error: AxiosError | any) {
          return <Navigate to={'/signup'} />
        }
        // const { data, isError } = await useRefresh()
        // if ( isError ) {
        //   return <Navigate to={'/signup'} />
        // }
      }
      console.log('we are constantly seeing the access token on route change!!!');
      
    }
  }

  const parseJwt = (token: any) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (error) {
      console.log('could not decode base64 jwt');
      return <Navigate to={'/signup'} />
    }
  }

  return <Outlet />;
}
