import React from 'react'

import styles from './categories.module.scss';

type Props = {}

export const CategoriesSidebar = (props: Props) => {
  return <>
    <span className={styles.categories__main__title}>Browse By Category</span>
    <div className={styles.categories__container}>
      <div className={styles.categories__category__container}>
        <span className={`material-icons-outlined ${styles.categories__category__logo}`}>
        devices
        </span>
        <span className={styles.categories__category__name}>Electronics</span>
      </div>

      <div className={styles.categories__category__container}>
        <span className={`material-icons-outlined ${styles.categories__category__logo}`}>
        checkroom
        </span>
        <span className={styles.categories__category__name}>Clothing</span>
      </div>
    </div>
  </>
}