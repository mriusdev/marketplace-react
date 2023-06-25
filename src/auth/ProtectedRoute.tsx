import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useMe from '../query-hooks/users/me/useMe'
import AuthService from './AuthService'
import { useNavigate } from 'react-router-dom'

type Props = {
  redirectPath?: string
}

const DEFAULT_REDIRECT = '/signup';

export const ProtectedRoute = ({redirectPath = DEFAULT_REDIRECT}: Props) => {
  if (!AuthService.isLoggedIn()) {
    AuthService.removeAuthDetailsFromLocalStorage();
    return <Navigate to={redirectPath} replace />
  }
  console.log("access token found but we don't know the validity of it");
  
  return <Outlet />
}
