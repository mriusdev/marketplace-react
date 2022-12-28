import React, { useState } from 'react'
import { Steps } from '../../../components/create/Steps'
import { ICategory } from '../../../interfaces'
import useCategories from '../../../query-hooks/navigation-related/useCategories'

import styles from './create-listing.module.scss'

type Props = {}

interface ICreateListing {

}

const stepsArray = [
  'one',
  'two',
  'three',
  'four'
]

interface IListingTextData {
  title: string
  description: string
  price: number
  category: string
}

export const CreateListing = (props: Props) => {
  const categories = useCategories();
  const [listingTextData, setListingTextData] = useState<IListingTextData>({
    title: '',
    description: '',
    price: 0,
    category: ''
  })

  return (
    <div className={styles.create_listing__container}>
      <h1>Create listing</h1>
      <Steps
        steps={stepsArray}
        currentStepIndex={0}
      >
        <form>
          <select name="category" id="category" onChange={(e) => setListingTextData((prev) => ({...prev, category: e.target.value}))}>
            <option value="" disabled selected>Select category</option>
            {categories.data.map((category: ICategory, index: number) => (
              <option key={index} value={category.id}>{category.name}</option>
            ))}
          </select>
        </form>
      </Steps>
    </div>
  )
}
