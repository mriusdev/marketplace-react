import { AxiosError } from 'axios'
import { ReactElement, useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useRefresh from '../query-hooks/auth/useRefresh'
import AuthService from './AuthService'
import { isObjectEmpty } from '../helper/helpers'
type Props = {}

export const AuthVerify = (props: Props) => {
  const location = useLocation()
  const { mutateAsync, isLoading } = useRefresh()
  useEffect(() => {
    verifyAuth()
  }, [location])

  async function verifyAuth(): Promise<ReactElement | void>
  {
    console.log('auth verify called');
    const oneMinuteAndAHalf = 15000;
    const jwtPayload = AuthService.getJwtPayload()
    if (isObjectEmpty(jwtPayload)) {
      return getAuthFailRoute();
    }

    if (!jwtPayload.exp) {
      return getAuthFailRoute();
    }
    // if we've 1 minute left, refetch at using refresh token
    const timeDifference = (jwtPayload.exp * 1000) - Date.now();
    if (timeDifference <= oneMinuteAndAHalf) {
      // call refresh token route and replace current at in localStorage
      try {
        const data = await mutateAsync()
        console.log('refresh token success', data);
        AuthService.addAuthDetailsToLocalStorage(data?.access_token)
        
      } catch (error: AxiosError | any) {
        return getAuthFailRoute();
      }
    }
  }

  function getAuthFailRoute(): ReactElement
  {
    AuthService.removeAuthDetailsFromLocalStorage();
    return <Navigate to={'/signup'} />
  }

  return <Outlet />;
}
