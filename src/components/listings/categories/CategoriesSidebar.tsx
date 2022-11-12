import React, { useState, useEffect } from 'react'

import styles from './categories.module.scss';
import useCategories from '../../../query-hooks/navigation-related/useCategories';
import { ICategory } from '../../../interfaces/categories';

type Props = {}


export const CategoriesSidebar = (props: Props) => {
  const categories = useCategories();

  return <>
    <span className={styles.categories__main__title}>Browse By Category</span>
    <div className={styles.categories__container}>
      {categories ? categories.data.map((category: ICategory) => (
        <div key={category.id} className={styles.categories__category__container}>
          <span className={`material-icons-outlined ${styles.categories__category__logo}`}>
            {category.iconClass}
          </span>
          <span className={styles.categories__category__name}>{category.name}</span>
        </div>
      )) : (
        <div className={styles.categories__category__container}>
          {/* <span className={`material-icons-outlined ${styles.categories__category__logo}`}>
          devices
          </span> */}
          <span className={styles.categories__category__name}>Loading</span>
        </div>
      )}
    </div>
  </>
}