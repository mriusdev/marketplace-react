import { Field, Form, Formik } from 'formik'
import styles from '../create/create-listing.module.scss'
import listingUpdateStyles from './listing-update.module.scss'
import { Button } from '../../../../components/buttons/Button'
import Message from '../../../../components/forms/information/Message'
import { FormikInput } from '../../../../components/forms/formik/FormikInput'
import { CustomFormikHelpers, setToast } from '../../../../helper/form'
import { Input } from '../../../../components/forms/input/Input'
import { ChangeEvent, useEffect, useState } from 'react'
import { IFiles } from '../create/CreateListing'
import { Link, useNavigate } from 'react-router-dom'
import { validate } from './lib/validation'
import { publicS3Url } from '../../../../helper/awsLinkFormatter'
import useUpdateListing from '../../../../query-hooks/listings/useUpdateListing'
import usePostTemporaryImages from '../../../../query-hooks/listings/usePostTemporaryImages'

interface ListingUpdateProps {
  listingTextData: IListingUpdateText
  listingImages: ICloudUploadedFile[]
  viewUnmount: () => void
  id: string
}

export interface IListingUpdateText {
  title?: string
  price?: number
  description?: string
}

export interface IFormErrorsValidationObject {
  title?: string
  description?: string
  price?: string
}

interface IClientUploadedFile {
  file: File
  previewUrl: string
}

interface ICloudUploadedFile {
  id: number,
  imageLocation: string
}

// export interface IVariousFiles {
//   (IClientUploadedFile | ICloudUploadedFile)[] | null
// }

export function ListingUpdate({listingTextData, viewUnmount, listingImages, id}: ListingUpdateProps) {
  
  const [fileList, setFileList] = useState<IFiles[] | null>(null)
  const [mixedFileList, setMixedFileList] = useState<(IClientUploadedFile | ICloudUploadedFile)[] | null>(null)
  const [cloudUploadedFilesList, setCloudUploadedFiles] = useState<ICloudUploadedFile[] | null>(null)
  const [deletedListingImages, setDeletedListingImages] = useState<number[] | undefined>(undefined)
  const navigate = useNavigate();

  const { 
    mutateAsync: updateListing,
    isError: updateListingError,
    isLoading: updateListingLoading 
  } = useUpdateListing(id)

  const {
    mutateAsync: postTemporaryImages
  } = usePostTemporaryImages()

  useEffect(() => {
    if (!listingImages?.length) {
      return;
    }
    setMixedFileList(listingImages.map(image => {
      image.imageLocation = publicS3Url(image.imageLocation);
      return image;
    }))
    // setCloudUploadedFiles(listingImages)
  }, [])

  const formikInitialValues: IListingUpdateText = {
    title: listingTextData.title,
    price: listingTextData.price,
    description: listingTextData.description
  }

  const { isAnyTouched } = new CustomFormikHelpers<IFormErrorsValidationObject>()

  async function handleListingUpdate(values: IListingUpdateText)
  {
    console.log('submitting update');
    // make sure only the diff values are in our possesion
    let diffListingText: IListingUpdateText = {};
    for (const valueName of Object.keys(values)) {
      if (values[valueName as keyof IListingUpdateText] === listingTextData[valueName as keyof IListingUpdateText]) {
        continue;
      }
      diffListingText = {...diffListingText, [valueName]: values[valueName as keyof IListingUpdateText]}
    }

    const newImagesToUpload = mixedFileList?.filter(value => {
      return 'previewUrl' in value;
    })

    console.log('final info', 'new images', newImagesToUpload, 'diff text', diffListingText, 'cloud images to delete', deletedListingImages);
    return;

    if (newImagesToUpload) {
      const files = new FormData();
      newImagesToUpload.forEach(value => {
        if (!('file' in value)) {
          return;
        }
        files.append('files', value.file)
      })
      await postTemporaryImages({files}).catch(() => {
        setToast({
          options: 'info',
          message: 'Could not upload new images'
        })
      });
    }

    if (!Object.keys(diffListingText).length) {
      viewUnmount()
      return; 
    }
 
    try {
      await updateListing({
        data: {
          listingTextData: {
            title: diffListingText.title,
            description: diffListingText.description,
            price: diffListingText.price
          },
          deletedListingImages: deletedListingImages
        },
        id: id
      })
      viewUnmount()
    } catch {

    }
  }

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>): void
  {
    const files = event.target.files;
    if (!files) {
      debugger
      return;
    }

    if (mixedFileList?.length === 3) {
      setToast({
        options: 'error',
        message: 'Cannot upload more than 3 images'
      })
      debugger

      return;
    }

    let customFilesList: IClientUploadedFile[] = [];
    let currentFileCount = 0;

    for (const file of files) {
      currentFileCount++;
      if (currentFileCount > 3) {
        setToast({
          options: 'error',
          message: 'Cannot upload more than 3 images'
        })
      debugger

        return;
      }
      customFilesList.push({
        file: file,
        previewUrl: URL.createObjectURL(file)
      })
    }

    if (mixedFileList?.length) {
      const totalFileCount = mixedFileList.length + customFilesList.length;
      const fileCountToRemove = totalFileCount > 3 ? totalFileCount - 3 : 0;

      if (fileCountToRemove) {
        customFilesList = customFilesList.slice(0, -fileCountToRemove);
      }

      setMixedFileList(prevState => {
        return [
          ...(prevState?.length ? prevState : []),
          ...customFilesList
        ]
      })

      // setFileList((previousFiles) => (
      //   [
      //     ...(previousFiles?.length ? previousFiles : []),
      //     ...customFilesList
      //   ]
      // ))
 
      return;
    }

    setFileList(customFilesList);
  }

  function handleImageDelete(image: IClientUploadedFile | ICloudUploadedFile): void
  {
    // if (!fileList) {
    //   return;
    // }

    if (!mixedFileList) {
      return;
    }

    if ('imageLocation' in image) {
      const filteredMixedFileList = mixedFileList.filter(value => {
        if (!('imageLocation' in value)) {
          return;
        }
        return value.id !== image.id
      })
      setMixedFileList(filteredMixedFileList)
      setDeletedListingImages(prevState => {
        if (!prevState) {
          return [image.id]
        }
        return [
          ...deletedListingImages as number[],
          image.id
        ]
      })

      return;
    }



    const modifiedFileList = mixedFileList.filter((value) => {
      if (!('previewUrl' in value)) {
        return;
      }
      return value.previewUrl !== image.previewUrl
    });
    setMixedFileList(modifiedFileList);

    URL.revokeObjectURL(image.previewUrl);
  }


  function computedImagePreviewUrl(uploadedFile: IClientUploadedFile | ICloudUploadedFile): string
  {
    if ('imageLocation' in uploadedFile) {
      return uploadedFile.imageLocation;
    }
    return uploadedFile.previewUrl;
  }

  function computedImageName(uploadedFile: IClientUploadedFile | ICloudUploadedFile): string
  {
    if ('imageLocation' in uploadedFile) {
      return 'Listing image';
    }
    return uploadedFile.file.name;
  }

  return (
    <div className={styles.create_listing__container}>
      <div className={listingUpdateStyles.modify_listing_page_title__container}>
        <div className={listingUpdateStyles.modify_listing_page_title_actions__container} onClick={() => viewUnmount()}>
          {/* <Link to={'listings/create'}> */}
            <span className="material-icons-outlined">arrow_back</span>
          {/* </Link> */}
        </div>
        <h2>Update listing</h2>
      </div>
      
        <div className={styles.create_listing__form_sections}>
          <section className={styles.listing_details__container}>
            <Formik
              initialValues={formikInitialValues}
              validate={(values) => validate(values, listingTextData)}
              onSubmit={handleListingUpdate}
              validateOnBlur={false}
            >
              {({ isValid, touched }) => (
                <Form className={styles.listing__form_container}>
                  <div className={styles.create_listing_inputs_container}>
                    {/* <div className={styles.create_listing_input}>
                      <label htmlFor="category">Category</label>
                      <Field
                        component={FormikDropdown}
                        items={categories?.data}
                        itemKey='id'
                        itemValue='name'
                        name='category'
                      />
                    </div> */}

                    <div className={styles.create_listing_input}>
                      <label htmlFor="title">Title</label>
                      <Field component={FormikInput} type="text" name="title" id="title" />
                    </div>
                    
                    <div className={styles.create_listing_input}>
                      <label htmlFor="price">Price</label>
                      <Field component={FormikInput} type="number" name="price" id="price" />
                    </div>
                    
                    <div className={styles.create_listing_input}>
                      <label htmlFor="description">Description</label>
                      <Field component={FormikInput} type="text" name="description" id="description" />
                    </div>
                    
                    <br />
                  </div>

                  <Button disabled={!isValid && isAnyTouched(touched)}
                    type='submit'
                    style={{
                      marginTop: '2rem',
                      marginBottom: '1rem',
                    }}
                    // loading={isLoadingPostListing || isLoadingPostTemporaryImages}
                  >
                    Update Listing
                  </Button>
{/* 
                  {(!(!!fileList?.length) && isValid && isAnyTouched(touched)) && (
                    <Message message='Listing will be posted without images' />
                  )} */}
                </Form>
              )}
            
            </Formik>
          </section>

          <section
            className={styles.listing__file_container}
          >
            <div
              className={styles.listing__file_header}
            >
              Images
              <Input
                type='file'
                disabled={mixedFileList?.length === 3}
                multiple
                onChange={handleFileUpload}
              />
            </div>
            
            {/* {!!(fileList?.length) && (
              <ul
                className={styles.listing__files}
              >
                {fileList.map((image, index) => (
                  <li className={styles.listing__file} key={index}>
                    <div className={styles.listing__file_preview_and_name}>
                      <img className={styles.listing__file_preview} src={image.previewUrl} />
                      <p>
                        {image.file.name}
                      </p>
                    </div>
                    
                    <div className={styles.listing__file_action_container}
                      onClick={() => handleImageDelete(image)}
                    >
                      <span className={`material-icons-outlined`}>
                        delete
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )} */}

            {!!(mixedFileList?.length) && (
              <ul
                className={styles.listing__files}
              >
                <h3>Actual images</h3>
                {mixedFileList.map((image, index) => (
                  <li className={styles.listing__file} key={index}>
                    <div className={styles.listing__file_preview_and_name}>
                      <img className={styles.listing__file_preview} src={computedImagePreviewUrl(image)} />
                      <p>
                        {/* {image.file.name} */}
                        {/* Uploaded image */}
                        {computedImageName(image)}
                      </p>
                    </div>
                    
                    <div className={styles.listing__file_action_container}
                      onClick={() => handleImageDelete(image)}
                    >
                      <span className={`material-icons-outlined`}>
                        delete
                      </span>
                    </div>
                  </li>
                ))}
                <h3>New images</h3>
              </ul>
            )}
          </section>
        </div>
    </div>
  )
}
