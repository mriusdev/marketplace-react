import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import useCategories from '../../query-hooks/navigation-related/useCategories'
import { LoadingScreen } from '../data-fetching/loading/LoadingScreen'
import { GenericErrorScreen } from '../error-handling/GenericErrorScreen'

import { RootNavCombined } from '../main-navigation/RootNavCombined'

type Props = {
  children?: ReactNode
}

export const RootLayout = (props: Props) => {
  const { isLoading, isError } = useCategories();

  if (isLoading) {
    return (
      <LoadingScreen />
    )
  }
  if (isError) {
    return <GenericErrorScreen />
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
