import React from 'react'

import styles from './main-navigation.module.scss'
import { MainNav } from './MainNav'
import { SubNav } from './SubNav'

export const RootNavCombined = () => {
  return (
    <>
      <nav>
        <header className={styles.header}>
          <SubNav />
          <MainNav />
        </header>
      </nav>
    </>
  )
}