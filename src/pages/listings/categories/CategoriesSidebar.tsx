import { useStore } from '../../../states/General';

import styles from './categories.module.scss';
import useCategories from '../../../query-hooks/navigation-related/useCategories';
import { ICategory } from '../../../interfaces';


export function CategoriesSidebar() {
  const categories = useCategories();
  const selectedCategory = useStore((state) => state.category);
  const changeCategory = useStore((state) => state.changeCategory);

  function toggleCategory(categoryId: number): void
  {
    if (selectedCategory !== categoryId) {
      return changeCategory(categoryId);
    }
    changeCategory(null)
  }

  return <>
    <span className={styles.categories__main__title}>Browse By Category</span>
    <div className={styles.categories__container}>
      {categories ? categories.data.map((category: ICategory) => (
        <div
          onClick={() => toggleCategory(category.id)}
          key={category.id}
          className={`${styles.categories__category__container} ${selectedCategory === category.id && styles.categories__selected}`}
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