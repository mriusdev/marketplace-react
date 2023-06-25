import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Card } from '../../components/listings/card/Card'
import { CategoriesSidebar } from '../../components/listings/categories/CategoriesSidebar'
import { IListing } from '../../interfaces'
import useListings from '../../query-hooks/listings/useListings'
import { useNavigate } from 'react-router-dom'

import styles from './listings.module.scss'

type Props = {
  currentPage?: number
  perPage?: number
}

export const Listings = () => {
  // set these from query params on first route to this page
  const navigate = useNavigate()
  const [currentPageState, setCurrentPageState] = useState(0)
  console.log('currentPageState', currentPageState);
  
  const [searchParams] = useSearchParams()
  let currentTestPage: string | number | null = searchParams.get('page')
  let currentTestPerPage: string | number | null = searchParams.get('perPage')
  if (currentTestPage) {
  // debugger
    currentTestPage = +currentTestPage
    // setCurrentPageState(currentTestPage)
  }
  if (currentTestPerPage) {
  // debugger
    currentTestPerPage = +currentTestPerPage
  }
  console.log('page test page', currentTestPage);
  console.log('page params', currentTestPerPage);

  const {data: listings, isLoading} = useListings({
    page: currentPageState,
  })
  
  const [pageNumbers, setPageNumbers] = useState<number[]>([])

  const navigateToPage = (pageNumber: number) => {
    // debugger
    navigate(`/listings?page=${pageNumber}`)
    setCurrentPageState(pageNumber)
  }

  useEffect(() => {
    if (listings) {
      initializePageNumbers(listings.totalPages)

    }
    if (currentTestPage) {
      setCurrentPageState(+currentTestPage)

    }
  }, [listings, currentPageState])

  function initializePageNumbers(totalPages: number) {
    let pageNumbersArray: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbersArray.push(i);
    }
    setPageNumbers(pageNumbersArray)
  }

  return (
    <div className={styles.main__container} style={{
      gridTemplateRows: 'auto auto'
    }}>
      <section className={styles.sidenav__container} style={{
        gridColumn: '1 / 2',
        gridRow: '1 / 3'
      }}>
       <CategoriesSidebar />
      </section>
      <section className={styles.listings__container} style={{
        gridColumn: '2 / 3',
        gridRow: '1 / 2'
      }}>
        {listings && listings.paginatedResults.map((listing: IListing) => (
          <Link key={listing.id} to={`${listing.id}`}>
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
      <div style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          gridColumn: '2 / 3',
          gridRow: '2 / 3'
        }}>
          <button>prev</button>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            columnGap: '0.5rem'
          }}>
            {pageNumbers.map((pageNumber, index) => (
                <button onClick={() => navigateToPage(pageNumber)} key={index} style={
                  pageNumber === currentTestPage ? {color: 'red', fontWeight: 'bold'} : {color: 'black'}
                }>{pageNumber}</button>
            ))}
          </div>
          <button>next</button>
        </div>
    </div>
  )
}
