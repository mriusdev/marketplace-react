import React from 'react'

import styles from './card.module.scss';

type Props = {}

export const Card = (props: Props) => {
  return (
    <div className={styles.card__container}>
      <div className={styles.image__wrapper}>
        <img src="https://source.unsplash.com/random/300×300/?shirt" alt="" />
      </div>
      <span className={styles.card__price}>$10</span>
      <span className={styles.card__title}>Colored shirt</span>
      <span className={styles.card__description}>Selling colored shirt. Buy it quick before I change my mind</span>
    </div>
  )
}