import React, { useEffect } from 'react'
import styles from './self-profile.module.scss'
import { Navigate, useParams } from 'react-router-dom'
import AuthService from '../../../auth/AuthService'
import { useNavigate } from 'react-router-dom'
import { Login } from '../../login/Login'
import useMe from '../../../query-hooks/users/me/useMe'
import { LoadingScreen } from '../../../components/data-fetching/loading/LoadingScreen'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../../api/apiConfig'

type Props = {}

export const SelfProfile = (props: Props) => {
  // const navigate = useNavigate();
  // if (!AuthService.useGetAccessToken()) {
  //   navigate('/signup')
  // }

  // useEffect(() => {
  //   pingRt()
  // }, [])
  
  // const pingRt = async () => {
  //   const { data: pingData, error: pingError } = useQuery(['ping'], async () => {
  //     return await api.get('check-rt', { withCredentials: true })
  //       .then((res) => res.data)
  //   })

  //   console.log('ping data is', pingData);
  // }

  // const handleStuff = () => {
  //   pingRt()
  // }

  const { data: userData, isLoading: userLoading, isError: userError, isFetching: userFetching } = useMe()
  
  try {
    const { data: pingData, error: pingError } = useQuery(['ping'], async () => {
      return await api.get('auth/check-rt')
        .then((res) => res.data)
    },{
      enabled: !!userData
    })
    console.log('ping data is', pingData);
  } catch (error) {
    console.log('error is', error);
    
  }
          

  if (userLoading || userFetching) {
    return <LoadingScreen />
  }
  if (userError) {
    console.log(userError);
    
    return <Navigate to={'/login'} replace />
  }


  // if (isError) {
  //   navigate('/signup')
  // }

  return (
    <div>
      <h1>Hello, {userData?.username} </h1>
      <h2>Name</h2>
      <h3>Email {userData?.email}</h3>

      {/* <button onClick={handleStuff}>Check refresh token</button> */}
    </div>
  )
}
