import React from 'react'
import { useParams } from 'react-router-dom'
import { LoadingScreen } from '../../../components/data-fetching/loading/LoadingScreen';
import useListing from '../../../query-hooks/listings/useListing';
import styles from './listing.module.scss'

type Props = {}

export const Listing = (props: Props) => {
  const { id } = useParams();
  const {data: listing, isLoading, error} = useListing(id as string)
  console.log(listing);
  
  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <div className={styles.listing__container}>
      <div className={styles.listing__content}>
        <h1>Listing {listing?.title}</h1>
        <h2>{listing?.price}</h2>
        <h3>{listing?.description}</h3>
        <button className={styles.listing__edit_btn}>Edit</button>
      </div>
    </div>
  )
}