import styles from './listings.module.scss'
import { iconClasses } from '../../helper/cssClasses'

interface IProps {
  listings: any
  isLoading: boolean
  pageNumbers: number[]
  handlePreviousPage: () => void
  handleNextPage: () => void
  handleNavigateToPage: (page: number) => void
}

export function ListingsPagination(
  {listings, pageNumbers, isLoading, handlePreviousPage, handleNextPage, handleNavigateToPage}: IProps
) {
  return (
    <nav className={styles.listings_pagination}>
      <div className={styles.listings_pagination__container}>
        <button
          disabled={!listings?.metadata?.previousPage && true}
          className={styles.listings_pagination_navigation}
          onClick={handlePreviousPage}
        >
          <span className={`${iconClasses.MATERIAL_ICONS_OUTLINED} ${styles.categories__category__logo}`}>
            arrow_back_ios
          </span>
        </button>
        <div className={styles.listings_pagination_page_numbers__container}>
          {listings && !isLoading && pageNumbers.map((pageNumber, index) => (
              <button
                onClick={() => handleNavigateToPage(pageNumber)}
                key={index}
                className={
                  `${styles.listings_pagination_page_number} ${pageNumber === listings?.metadata?.currentPage ? styles.listings_pagination_page_number_active : ''}`
                }
              >
                {pageNumber}
              </button>
          ))}
        </div>
        <button
          disabled={!listings?.metadata?.nextPage && true}
          className={styles.listings_pagination_navigation}
          onClick={handleNextPage}
        >
          <span className={`${iconClasses.MATERIAL_ICONS_OUTLINED}`}>
            arrow_forward_ios
          </span>
        </button>
      </div>
    </nav>
  )
}
