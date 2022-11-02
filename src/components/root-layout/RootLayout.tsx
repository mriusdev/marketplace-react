import React, { ReactNode } from 'react'

import { RootNavCombined } from '../main-navigation/RootNavCombined'

type Props = {
  children?: ReactNode
}

export const RootLayout = ({children}: Props) => {
  return (
    <div className='container_root'>
      <RootNavCombined />
      <main>
        {children}
      </main>
    </div>
  )
}
