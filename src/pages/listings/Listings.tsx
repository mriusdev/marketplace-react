import { useEffect, useState } from 'react'
import { Link, useSearchParams, createSearchParams } from 'react-router-dom'
import { Card } from '../../components/listings/card/Card'
import { CategoriesSidebar } from '../../components/listings/categories/CategoriesSidebar'
import { IListing } from '../../interfaces'
import useListings from '../../query-hooks/listings/useListings'
import { useNavigate } from 'react-router-dom'

import styles from './listings.module.scss'
import { ListingsPagination } from './ListingsPagination'

export const Listings = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(getCurrentPage())
  const [pageNumbers, setPageNumbers] = useState<number[]>([])

  const {data: listings, isLoading} = useListings({
    page: currentPage,
  })

  function getCurrentPage(): number
  {
    let currentTestPage: string | number | null = searchParams.get('page')
    if (!currentTestPage) {
      return 1;
    }
    return +currentTestPage;
  }

  function navigateToPage(pageNumber: number): void {
    navigate({
      pathname: '/listings',
      search: createSearchParams({ page: pageNumber.toString() }).toString()
    })
    setCurrentPage(pageNumber)
  }

  function nextPage(): void {
    if(!listings?.metadata?.nextPage) {
      return;
    }
    navigateToPage(++listings.metadata.currentPage);
  }

  function previousPage(): void {
    if(!listings?.metadata?.previousPage) {
      return;
    }
    setCurrentPage(--listings.metadata.currentPage)
  }

  function initializePageNumbers(totalPages: number): void {
    let pageNumbersArray: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbersArray.push(i);
    }
    setPageNumbers(pageNumbersArray)
  }

  useEffect(() => {
    if (listings) {
      initializePageNumbers(listings.metadata.totalPages)
    }
  }, [listings])

  return (
    <div className={styles.main__container}>
      <section className={styles.sidenav__container}>
       <CategoriesSidebar />
      </section>

      <section className={styles.listings__container}>
        {listings && listings.data.map((listing: IListing) => (
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

      <ListingsPagination
        listings={listings}
        isLoading={isLoading}
        pageNumbers={pageNumbers}
        handlePreviousPage={previousPage}
        handleNextPage={nextPage}
        handleNavigateToPage={navigateToPage}
      />
    </div>
  )
}
