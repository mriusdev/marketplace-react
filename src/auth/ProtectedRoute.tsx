import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useMe from '../query-hooks/users/me/useMe'
import AuthService from './AuthService'
import { useNavigate } from 'react-router-dom'

type Props = {
  redirectPath?: string
}

export const ProtectedRoute = ({redirectPath = '/signup'}: Props) => {
  if (!AuthService.useGetAccessToken()) {
    localStorage.removeItem('at');
    return <Navigate to={redirectPath} replace />
  }
  console.log("access token found but we don't know the validity of it");
  
  return <Outlet />
}