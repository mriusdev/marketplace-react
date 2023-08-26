import { useStore } from '../../../states/General';

import styles from './categories.module.scss';
import useCategories from '../../../query-hooks/navigation-related/useCategories';
import { ICategory } from '../../../interfaces';
import { createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';

export function CategoriesSidebar() {
  const navigate = useNavigate()
  const categories = useCategories();

  const [searchParams, setSearchParams] = useSearchParams();

  const listingFilters = useStore((state) => state.listingFilters);
  const changeListingFilters = useStore((state) => state.changeListingFilters);

  function toggleCategory(categoryId: number): void
  {
    if (listingFilters.category !== categoryId) {
      navigate({
        pathname: '/listings',
        search: createSearchParams({ page: '1', category: categoryId.toString() }).toString()
      })
      return changeListingFilters({ category: categoryId});
    }


    searchParams.delete('category');
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    
    changeListingFilters({ page: 1, category: null})
  }

  return <>
    <span className={styles.categories__main__title}>Browse By Category</span>
    <div className={styles.categories__container}>
      {categories ? categories.data.map((category: ICategory) => (
        <div
          onClick={() => toggleCategory(category.id)}
          key={category.id}
          className={`${styles.categories__category__container} ${listingFilters.category === category.id && styles.categories__selected}`}
        >
          <span className={`material-icons-outlined ${styles.categories__category__logo}`}>
            {category.iconClass}
          </span>
          <span className={styles.categories__category__name}>{category.name}</span>
        </div>
      )) : (
        <div className={styles.categories__category__container}>
          <span className={styles.categories__category__name}>Loading</span>
        </div>
      )}
    </div>
  </>
}
