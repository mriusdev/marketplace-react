import React, { ChangeEvent, useState } from 'react'
import { Navigate } from 'react-router'

import { LoadingScreen } from '../../../../components/data-fetching/loading/LoadingScreen'

import useCreateListing from '../../../../query-hooks/listings/useCreateListing'
import useCategories from '../../../../query-hooks/navigation-related/useCategories'
import useMe from '../../../../query-hooks/users/me/useMe'
import usePostTemporaryImages from '../../../../query-hooks/listings/usePostTemporaryImages'

import styles from './create-listing.module.scss'
import { Button } from '../../../../components/buttons/Button'
import { Field, Form, Formik, FormikHelpers } from 'formik'
import { FormikDropdown } from '../../../../components/forms/dropdown/FormikDropdown'
import { FormikInput } from '../../../../components/forms/formik/FormikInput'
import Message from '../../../../components/forms/information/Message'
import { Link } from 'react-router-dom'
import { AxiosError } from 'axios'
import { setToast, CustomFormikHelpers, VALIDATION_MESSAGES } from '../../../../helper/form'
import { validate } from './lib/validation'
import { IPostListing } from '../../../../api/listings/listingsAPI'
import { Input } from '../../../../components/forms/input/Input'
import { parseErrorMessage } from '../../../../helper/helpers'
import { ERRORS } from '../../../../helper/errors'

export interface IInitialListingTextData {
  title: string
  description: string
  price: number
  category: number | null
}

export interface IFiles {
  file: File
  previewUrl: string
}

export interface IFormErrorsValidationObject {
  title?: string
  description?: string
  price?: string
  category?: string
}

export const CreateListing = () => {
  const [fileList, setFileList] = useState<IFiles[] | null>(null)

  const { data: userData, isError: userError } = useMe()
  const categories = useCategories();

  const { isAnyTouched } = new CustomFormikHelpers<IFormErrorsValidationObject>()

  const {
    mutateAsync: postTemporaryImagesAsync,
    isLoading: isLoadingPostTemporaryImages
  } = usePostTemporaryImages()
  const { 
    mutateAsync: postListingAsync,
    isSuccess: isSuccessPostListing,
    isLoading: isLoadingPostListing,
    data: dataPostListing
  } = useCreateListing()

  const formikInitialValues: IInitialListingTextData = {
    title: '',
    description: '',
    price: 0,
    category: null,
  }

  async function handlePostListing(
    values: IInitialListingTextData,
    actions: FormikHelpers<IInitialListingTextData>
  ): Promise<void> {
    if (typeof values.category !== 'number') {
      actions.setFieldError('category', VALIDATION_MESSAGES.REQUIRED)
      return;
    }
    const validatedValues: IPostListing = values as IPostListing

    let files = null;
    if (fileList !== null && fileList.length) {
      files = new FormData()
      for (const {file} of fileList) {
        files.append('files', file)
      }

      try {
        await postTemporaryImagesAsync({files});
      } catch (error) {
        setToast({
          options: 'error',
          message: parseErrorMessage(error) ?? ERRORS.GENERIC
        })
        return;
      }
    }

    try {
      if (typeof validatedValues.category !== 'number') {
        return;
      }

      await postListingAsync(validatedValues)
      setToast({dismiss: true})
    } catch (error) {
      if (error instanceof AxiosError) {
        setToast({
          options: 'error',
          message: parseErrorMessage(error) ?? ERRORS.GENERIC
        })
      }
    }
  }

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>): void
  {
    const files = event.target.files;
    if (!files) {
      return;
    }

    if (fileList?.length === 3) {
      setToast({
        options: 'error',
        message: 'Cannot upload more than 3 images'
      })
      return;
    }

    let customFilesList: IFiles[] = [];
    let currentFileCount = 0;

    for (const file of files) {
      currentFileCount++;
      if (currentFileCount > 3) {
        setToast({
          options: 'error',
          message: 'Cannot upload more than 3 images'
        })
        return;
      }
      customFilesList.push({
        file: file,
        previewUrl: URL.createObjectURL(file)
      })
    }

    if (fileList?.length) {
      const totalFileCount = fileList.length + customFilesList.length;
      const fileCountToRemove = totalFileCount > 3 ? totalFileCount - 3 : 0;

      if (fileCountToRemove) {
        customFilesList = customFilesList.slice(0, -fileCountToRemove);
      }

      setFileList((previousFiles) => (
        [
          ...(previousFiles?.length ? previousFiles : []),
          ...customFilesList
        ]
      ))
 
      return;
    }

    setFileList(customFilesList);
  }

  function handleImageDelete(fileToDelete: IFiles): void
  {
    if (!fileList) {
      return;
    }

    const modifiedFileList = fileList.filter((file) => file.previewUrl !== fileToDelete.previewUrl);
    setFileList(modifiedFileList);

    URL.revokeObjectURL(fileToDelete.previewUrl);
  }

  if (!userData) {
    return <LoadingScreen />
  }
  if (userError) {
    return <Navigate to={'/login'} replace />
  }

  return (
    <div className={styles.create_listing__container}>
      <h2 style={{padding: '1rem'}}>Create listing</h2>
      {isSuccessPostListing ? (
        <section className={styles.listing_posted_container}>
          <Message style='success' message='Listing has been created' />
          {(dataPostListing?.data && dataPostListing?.data?.id) && (
            <Link style={{
                textDecoration: 'underline'
              }}
              to={`/listings/${dataPostListing?.data?.id}`}
            >
              Go to listing
            </Link>
          )}
        </section>
      ) : (
        <div className={styles.create_listing__form_sections}>
          <section className={styles.listing_details__container}>
            <Formik
              initialValues={formikInitialValues}
              validate={validate}
              onSubmit={handlePostListing}
            >
              {({ isValid, touched }) => (
                <Form className={styles.listing__form_container}>
                  <div className={styles.create_listing_inputs_container}>
                    <div className={styles.create_listing_input}>
                      <label htmlFor="category">Category</label>
                      <Field
                        component={FormikDropdown}
                        items={categories?.data}
                        itemKey='id'
                        itemValue='name'
                        name='category'
                      />
                    </div>

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

                  <Button disabled={!isValid && isAnyTouched(touched) || (isLoadingPostListing || isLoadingPostTemporaryImages)}
                    type='submit'
                    style={{
                      marginTop: '2rem',
                      marginBottom: '1rem',
                    }}
                    loading={isLoadingPostListing || isLoadingPostTemporaryImages}
                  >
                    Post Listing
                  </Button>
                  {/* <Spinner /> */}
                  {(!(!!fileList?.length) && isValid && isAnyTouched(touched)) && (
                    <Message message='Listing will be posted without images' />
                  )}
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
                disabled={fileList?.length === 3}
                multiple
                onChange={handleFileUpload}
              />
            </div>
            
            {!!(fileList?.length) && (
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
            )}
          </section>
        </div>
      )}
    </div>
  )
}
