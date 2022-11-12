import React, { FormEvent, useState } from 'react'

import styles from './main-navigation.module.scss'
import useCategories from '../../query-hooks/navigation-related/useCategories'
import { ICategory } from '../../interfaces/categories'
import { useNavigate } from 'react-router-dom'

type Props = {}

export const MainNav = (props: Props) => {
  const categories = useCategories();
  const [searchValue, setSearchValue] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert(`Form submitted with search value of ${searchValue}`)
  }

  return (
    <div className={styles.main__nav_container}>
      <div className={styles.main__nav__logo} onClick={() => navigate('/listings')}>
        <span id={styles.main__nav__svg_logo} className="material-icons-outlined">storefront</span>
        <span id={styles.main__nav__logo_text}>Marketplace
          <br />Company
        </span>
      </div>

      <form onSubmit={handleSubmit} className={styles.main__nav_search_container}>
        <div className={styles.main__nav_search}>
          <div className={styles.main__nav_flex} id={styles.main__nav_search_bar}>
            <span style={{fontSize: '1.1rem', color: 'grey'}} className="material-icons-outlined">
              search
            </span>
            <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='Search for any listings' />
          </div>
          <div className={styles.main__nav_flex} id={styles.main__nav_categories}>
            <select name="" id="">
              <option value="0">All Categories</option>
              {categories.data.map((category: ICategory) => (
                <option value={category.id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button type='submit' className={styles.button_cta_lg}>
          Search
        </button>
      </form>
    </div>
  )
}