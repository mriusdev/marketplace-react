import React from 'react'
import styles from './loading.module.scss'

type Props = {}

export const LoadingScreen = (props: Props) => {
  return (
    <div className={styles.loading__container}>
      <div className={styles.loading__content__container}>
        <span>Loading...</span>
      </div>
    </div>
  )
}