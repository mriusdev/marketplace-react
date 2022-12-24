import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/listings/card/Card'
import { CategoriesSidebar } from '../../components/listings/categories/CategoriesSidebar'
import { IListing } from '../../interfaces'
import useListings from '../../query-hooks/listings/useListings'

import styles from './listings.module.scss'

type Props = {}

export const Listings = (props: Props) => {
  const {data: listings, isLoading} = useListings()
  // console.log(listings?.data);
  
  return (
    <div className={styles.main__container}>
      <section className={styles.sidenav__container}>
       <CategoriesSidebar />
      </section>
      <section className={styles.listings__container}>
        {listings && listings.map((listing: IListing) => (
          <Link to={`${listing.id}`}>
            <Card
              key={listing.id}
              price={listing.price}
              title={listing.title}
              description={listing.description}
              listingImages={listing.listingImages}
            />
          </Link>
          
        ))}
      </section>
    </div>
  )
}
