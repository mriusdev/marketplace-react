import React, { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingScreen } from '../../../components/data-fetching/loading/LoadingScreen';
import { publicS3Url } from '../../../helper/awsLinkFormatter';
import { IListing } from '../../../interfaces';
import useListing from '../../../query-hooks/listings/useListing';
import useUpdateListing, { IUpdatedListingParams } from '../../../query-hooks/listings/useUpdateListing';
import styles from './listing.module.scss'

type Props = {}

export interface IFormData {
  title?: string
  price?: string | number
  description?: string
}

export const Listing = (props: Props) => {
  const { id } = useParams();
  const [toggleEdit, setToggleEdit] = useState<boolean>(false)
  const [formData, setFormData] = useState<IFormData>({
    title: '',
    price: '',
    description: ''
  })
  const [fileObject, setFileObject] = useState<any>(undefined)


  const objectParams: IUpdatedListingParams = {
    formData,
    id
  }
  const { data: listing, isLoading, error } = useListing(id as string)
  const { mutateAsync, isLoading: isLoadingUpdate } = useUpdateListing(objectParams)
  console.log(listing);
  useEffect(() => {
    if (!formData.title && listing) {
      setFormData(listing)
    }
  }, [toggleEdit])
  
  if (isLoading) {
    return <LoadingScreen />
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  const handleListingUpdate = async (e: FormEvent) => {
    e.preventDefault()
    console.log('formData', formData);
    try {
      const data = await mutateAsync({formData, id})
    } catch (error) {
      console.log('listing update error', error);
    }
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileObject(undefined)
    const files = e.target.files
    // TODO: refactor if no files check
    if (!files) {
      return;
    }
    const fr = new FileReader()
    fr.readAsDataURL(files[0])
    fr.addEventListener('load', () => {
      setFileObject(files[0])
    })
  }

  return (
    <div className={styles.listing__container}>
      <div className={styles.listing__content}>
        {toggleEdit ? (
          <form onSubmit={handleListingUpdate} className={styles.listing__form_container}>
            <div>
              <h1>
                <label htmlFor="title">Title</label>
              </h1>
              <input type="text" name="title" id="title" value={formData?.title} onChange={onChange}/>

              <h2>
                <label htmlFor="price">Price</label>
              </h2>
              <input type="text" name="price" id="price" value={formData?.price} onChange={onChange}/>

              <h3>
                <label htmlFor="description">Description</label>
              </h3>
              <input type="text" name="description" id="description" value={formData?.description} onChange={onChange}/>
              <br />
              <button>Save changes</button>
            </div>

            <div className={styles.listing__image_container}>
              img
            </div>
            

            <div>
              <label htmlFor="image">Image</label>
              <input type="file" name="image" id="image" accept="image/*" onChange={onFileChange} />
            </div>
          </form>
        ) : (
          // read only section
          <div className={styles.listing__read_container}>
            <div className={styles.listing__image_container}>
              <img src={ listing?.listingImages[0]?.imageLocation ? publicS3Url(listing.listingImages[0].imageLocation) : "https://source.unsplash.com/random/50×50/?shirt"} alt="" />
            </div>
            <div className={styles.listing__read_details_container}>
              <span className={styles.listing__title_text}>{listing?.title}</span>
              <span className={styles.listing__small_text}>{listing?.price}</span>
              <span className={styles.listing__extra_small_text}>Listed on {listing?.createdAt}</span>
              <div className={styles.listing__horizontal_divider} />
              <span className={styles.listing__description_meta}>Seller's description</span>
              <span className={styles.listing__description_text}>{listing?.description}</span>
            </div>
          </div>
        )}
        <button className={styles.listing__edit_btn} onClick={() => setToggleEdit(!toggleEdit)}>Edit</button>
      </div>
    </div>
  )
}
