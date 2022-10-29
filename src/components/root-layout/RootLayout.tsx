import React, { ReactNode } from 'react'

import { MainNavigation } from '../main-navigation/MainNavigation'

type Props = {
  children?: ReactNode
}

export const RootLayout = ({children}: Props) => {
  return (
    <div className='container_root'>
      <MainNavigation />
      <main>
        {children}
      </main>
    </div>
  )
}
