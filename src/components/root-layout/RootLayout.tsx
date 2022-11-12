import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import useCategories from '../../query-hooks/navigation-related/useCategories'
import { LoadingScreen } from '../data-fetching/loading/LoadingScreen'

import { RootNavCombined } from '../main-navigation/RootNavCombined'

type Props = {
  children?: ReactNode
}

export const RootLayout = (props: Props) => {
  const users = useCategories();
  console.log(users);

  if (users.isLoading) {
    return (
      <LoadingScreen />
    )
  }
  return (
    <div className='container_root'>
      <RootNavCombined />
      <main>
        <Outlet />
      </main>
    </div>
  )
}
