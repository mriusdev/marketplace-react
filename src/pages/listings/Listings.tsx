import { useEffect, useState } from 'react'
import { Link, useSearchParams, createSearchParams } from 'react-router-dom'
import { Card } from '../../components/listings/card/Card'
import { CategoriesSidebar } from './categories/CategoriesSidebar'
import { IListing } from '../../interfaces'
import useListings from '../../query-hooks/listings/useListings'
import { useNavigate } from 'react-router-dom'

import styles from './listings.module.scss'
import { ListingsPagination } from './ListingsPagination'
import { useStore } from '../../states/General'
import { Button } from '../../components/buttons/Button'

export const Listings = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const [pageNumbers, setPageNumbers] = useState<number[]>([])
 
  const listingFilters = useStore((state) => state.listingFilters);
  const changeListingFilters = useStore((state) => state.changeListingFilters);

  const searchParamsObject = Object.fromEntries([...searchParams]);

  const {data: listings, isLoading} = useListings(listingFilters)
  
  function navigateToPage(pageNumber: number): void {
    navigate({
      pathname: '/listings',
      search: createSearchParams({ ...searchParamsObject, page: pageNumber.toString() }).toString()
    })
    
    changeListingFilters({...listingFilters, page: pageNumber})
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
    navigateToPage(--listings.metadata.currentPage);
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

    if (document.referrer === "") {
      changeListingFilters({
        category: searchParamsObject.category ? +searchParamsObject.category : null,
        page: searchParamsObject.page ? +searchParamsObject.page : 1
      })
    }
    
  }, [listings])

  return (
    <div className={styles.main__container}>
      <section className={styles.sidenav__container}>
       <CategoriesSidebar />
       <Button>Create New Listing</Button>
      </section>

      <section className={styles.listings__container}>
        {listings?.data && listings?.data.length > 0 ? listings.data.map((listing: IListing) => (
          <Link key={listing.id} to={`${listing.id}`}>
            <Card
              key={listing.id}
              price={listing.price}
              title={listing.title}
              description={listing.description}
              listingImages={listing.listingImages}
            />
          </Link>
        )) :
        (
          <div>
            <h1>no listings found :( </h1>
          </div>
        )
        }
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
