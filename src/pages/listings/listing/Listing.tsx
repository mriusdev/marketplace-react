import React, { ChangeEvent, FormEvent, FormEventHandler, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LoadingScreen } from '../../../components/data-fetching/loading/LoadingScreen';
import { publicS3Url } from '../../../helper/awsLinkFormatter';
import { IListing } from '../../../interfaces';
import useListing from '../../../query-hooks/listings/useListing';
import useUpdateListing, { IUpdatedListingParams } from '../../../query-hooks/listings/useUpdateListing';
import useUpdateListingImage from '../../../query-hooks/listings/useUpdateListingImage';
import styles from './listing.module.scss'

export interface IFormData {
  title?: string
  price?: string | number
  description?: string
}

export const Listing = () => {
  const { id } = useParams();
  const [toggleEdit, setToggleEdit] = useState<boolean>(false)
  const [toggleEditImages, setToggleEditImages] = useState<boolean>(false)
  const [formData, setFormData] = useState<IFormData>({
    title: '',
    price: '',
    description: ''
  })
  const [fileObject, setFileObject] = useState<File | undefined>(undefined)

  const objectParams: IUpdatedListingParams = {
    formData,
    id
  }
  const { data: listing, isLoading, error } = useListing(id as string)
  const { mutateAsync: mutateListingDataAsync, isLoading: isLoadingUpdate } = useUpdateListing(objectParams)
  const { mutateAsync: mutateUpdateListingImageAsync, isLoading: isLoadingUpdateListingImage } = useUpdateListingImage({id})
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
      await mutateListingDataAsync({formData, id})
    } catch (error) {
      console.log('listing update error', error);
    }
  }

  const handleListingImageUpdate = async (e: FormEvent) => {
    e.preventDefault()
    const updateImageFormData = new FormData()
    updateImageFormData.append('id', listing?.listingImages[0].id as any)
    updateImageFormData.append('path', listing?.listingImages[0].imageLocation as any)
    updateImageFormData.append('file', fileObject as File)
    try {
      await mutateUpdateListingImageAsync({updateImageFormData, id})
      setToggleEditImages(!toggleEditImages)
    } catch (error) {
      console.log('listing image update error', error);
    }
  }

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFileObject(undefined)
    const files = e.target.files
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
              <div className={styles.listing__image_edit_pompt} onClick={() => setToggleEditImages(!toggleEditImages)}>
                {toggleEditImages ? (
                  <span id={styles.listing__image_edit_icon} className="material-icons-outlined">close</span>
                ) : (
                  <span id={styles.listing__image_edit_icon} className="material-icons-outlined">edit</span>
                  
                )}
              </div>
              {toggleEditImages && (
                <form className={styles.listing__image_edit_container} onSubmit={handleListingImageUpdate}>
                  <div className={styles.listing__image_edit_actions}>
                    <input type="file" name="image" id="image" accept="image/*" onChange={onFileChange} />
                  </div>
                  <button className={styles.listing__image_save_button}>Save changes</button>
                </form>
              )}
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
        <button className={styles.listing__edit_btn} onClick={() => setToggleEdit(!toggleEdit)}>
          {toggleEdit ? (
            <span>Cancel</span>
          ) : (
            <span>Edit</span>
          )}
        </button>
      </div>
    </div>
  )
}
