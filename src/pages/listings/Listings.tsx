import React, { useEffect } from 'react'
import { Card } from '../../components/listings/card/Card'
import { CategoriesSidebar } from '../../components/listings/categories/CategoriesSidebar'

import styles from './listings.module.scss'

type Props = {}

export const Listings = (props: Props) => {
  return (
    <div className={styles.main__container}>
      <section className={styles.sidenav__container}>
       <CategoriesSidebar />
      </section>
      <section className={styles.listings__container}>
        {[1,2,3,4,5,6,7].map(number => (
          <Card key={number} />
        ))}
      </section>
    </div>
  )
}
