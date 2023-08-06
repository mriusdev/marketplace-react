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
import { IGetListingsParams } from '../../interfaces/listings/listingAPI'

export const Listings = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(getCurrentPage())
  const [pageNumbers, setPageNumbers] = useState<number[]>([])
  const zustandCategory = useStore((state) => state.category);

  function getSearchParams(): IGetListingsParams
  {
    const searchParamsObject: IGetListingsParams = {};
    if (currentPage) {
      searchParamsObject.page = currentPage;
    }
    if (zustandCategory) {
      searchParamsObject.category = zustandCategory;
    }
    return searchParamsObject;
  }

  // const {data: listings, isLoading} = useListings({
  //   page: currentPage,
  //   category: zustandCategory,
  // })

  const {data: listings, isLoading} = useListings(getSearchParams())

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
    console.log('zustandCategory change action');
    
  }, [listings, zustandCategory])

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

      {zustandCategory && (
        <h3>
          category is selected - {zustandCategory}
        </h3>
      )}
    </div>
  )
}
