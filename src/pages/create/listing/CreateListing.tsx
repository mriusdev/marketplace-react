import { QueryCache } from '@tanstack/react-query'
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { Navigate } from 'react-router'
import { Steps } from '../../../components/create/Steps'
import { LoadingScreen } from '../../../components/data-fetching/loading/LoadingScreen'
import { ICategory } from '../../../interfaces'
import useCreateListing from '../../../query-hooks/listings/useCreateListing'
import useCategories from '../../../query-hooks/navigation-related/useCategories'
import useMe from '../../../query-hooks/users/me/useMe'

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

interface IFileObjects {
  file?: File
  previewImageSrc?: string
}

export const CreateListing = (props: Props) => {
  const { data: userData, isError: userError } = useMe()
  const fileUploadRef = useRef<HTMLInputElement>(null)
  const categories = useCategories();
  const [listingTextData, setListingTextData] = useState<IListingTextData>({
    title: '',
    description: '',
    price: 0,
    category: ''
  })
  const [fileObjects, setFileObjects] = useState<IFileObjects[] | [] | IFileObjects>([])
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[] | undefined>(undefined)

  const { mutateAsync: mutateCreateListingAsync } = useCreateListing()
  if (!userData) {
    return <LoadingScreen />
  }
  if (userError) {
    return <Navigate to={'/login'} replace />
  }

  const handleCreateListing = async (e: FormEvent) => {
    e.preventDefault()
    const createListingFormData = new FormData()
    createListingFormData.append('title', listingTextData.title)
    createListingFormData.append('description', listingTextData.description)
    createListingFormData.append('price', listingTextData.price as any)
    createListingFormData.append('category', listingTextData.category)
    if (!fileUploadRef.current) {
      return
    }
    const currentFiles: FileList | null = fileUploadRef.current.files
    if (!currentFiles) {
      return;
    }
    for (const file of currentFiles) {
      createListingFormData.append('files', file)
    }
    try {
      await mutateCreateListingAsync({createListingFormData})
      alert('listing created!')
    } catch (error) {
      console.log('listing create error', error);
    }
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListingTextData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) {
      return;
    }
    // let testFiles = Array.from(files || [])
    // setFiles(testFiles)
    let imagesArray = []
    for(const file of files) {
      imagesArray.push(URL.createObjectURL(file))
    }
    setImagePreviewUrls(imagesArray)
  }

  const removeImage = (imageURL: string, indexToRemove: number) => {
    URL.revokeObjectURL(imageURL)
    // let fileListArr = files || []
    // fileListArr.splice(indexToRemove, 1)
    // setFiles(fileListArr)
    setImagePreviewUrls(imagePreviewUrls?.filter((image) => image !== imageURL))
    if (!fileUploadRef.current) {
      return;
    }
    const inputFiles: FileList | null = fileUploadRef.current.files
    if (!inputFiles) {
      return;
    }
    const dataTransfer = new DataTransfer()
    for (let i = 0; i < inputFiles.length; i++) {
      if (i !== indexToRemove) {
        dataTransfer.items.add(inputFiles[i])
      }
    }
    fileUploadRef.current.files = dataTransfer.files
  }
  const computedImagePreviewURL = (file: File): string => {
    return URL.createObjectURL(file)
  }

  return (
    <div className={styles.create_listing__container}>
      <h1>Create listing</h1>
      {/* <Steps
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
      </Steps> */}
      {/* <form>
        <label htmlFor="category">Category</label>
        <br />
        <select name="category" id="category" onChange={(e) => setListingTextData((prev) => ({...prev, category: e.target.value}))}>
          <option value="" disabled selected>Select category</option>
          {categories.data.map((category: ICategory, index: number) => (
            <option key={index} value={category.id}>{category.name}</option>
          ))}
        </select>
        <br />
        
      </form> */}
      <form onSubmit={handleCreateListing} className={styles.listing__form_container}>
        <div>
          <h1>
            <label htmlFor="category">Category</label>
          </h1>
          <select name="category" id="category" onChange={(e) => setListingTextData((prev) => ({...prev, category: e.target.value}))}>
            <option value="" disabled selected>Select category</option>
            {categories.data.map((category: ICategory, index: number) => (
              <option key={index} value={category.id}>{category.name}</option>
            ))}
          </select>
          <h1>
            <label htmlFor="title">Title</label>
          </h1>
          <input type="text" name="title" id="title" value={listingTextData?.title} onChange={onChange}/>

          <h2>
            <label htmlFor="price">Price</label>
          </h2>
          <input type="text" name="price" id="price" value={listingTextData?.price} onChange={onChange}/>

          <h3>
            <label htmlFor="description">Description</label>
          </h3>
          <input type="text" name="description" id="description" value={listingTextData?.description} onChange={onChange}/>
          <br />
        </div>

        <div>
          <label htmlFor="image">Image</label>
          <input type="file" name="image" id="image" ref={fileUploadRef} accept="image/*" multiple onChange={onFileChange} />
        </div>

        <div className={styles.listing__image_container}>
          {imagePreviewUrls?.map((image, index) => (
            <div key={index} className={styles.listing__image_flex}>
              <img src={image} alt="" className={styles.listing__image}/>
              <button type='button' onClick={() => removeImage(image, index)}>Delete</button>
            </div>
          ))}
        </div>
        <button>Save changes</button>

      </form>
    </div>
  )
}
