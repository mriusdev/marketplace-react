import { QueryCache } from '@tanstack/react-query'
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react'
import { Navigate } from 'react-router'

import { Input } from '../../../../components/forms/input/Input'

import { LoadingScreen } from '../../../../components/data-fetching/loading/LoadingScreen'
import { ICategory } from '../../../../interfaces'

import useCreateListing from '../../../../query-hooks/listings/useCreateListing'
import useCategories from '../../../../query-hooks/navigation-related/useCategories'
import useMe from '../../../../query-hooks/users/me/useMe'

import styles from './create-listing.module.scss'
import { Button } from '../../../../components/buttons/Button'
import { Dropdown } from '../../../../components/forms/dropdown/Dropdown'
import { Field, Form, Formik, FormikErrors, useFormik } from 'formik'
import { FormikDropdown } from '../../../../components/forms/dropdown/FormikDropdown'
import { FormikInput } from '../../../../components/forms/formik/FormikInput'

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

interface IFiles {
  file: File
  previewUrl: string
}

interface IFormErrorsValidationObject {
  title?: string
  description?: string
  price?: string
  category?: string
}

const validate = (values: IListingTextData): FormikErrors<IFormErrorsValidationObject> => {
  const errors: FormikErrors<IFormErrorsValidationObject> = {};
  const requiredValidationMessage = 'Required';

  if (!values.title) {
    errors.title = requiredValidationMessage
  }
  if (!values.description) {
    errors.description = requiredValidationMessage
  }
  if (!values.price) {
    errors.price = requiredValidationMessage
  }
  if (!values.category) {
    errors.category = requiredValidationMessage
  }

  console.log('errors', errors);
  

  return errors;
}

export const CreateListing = () => {
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
  const [fileList, setFileList] = useState<IFiles[] | null>(null)
  const [imagePreviewUrls, setImagePreviewUrls] = useState<string[] | undefined>(undefined)
  const [isFormValid, setIsFormValid] = useState<boolean>(false)
  const [temporaryImagesSaved, setTemporaryImagesSaved] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
    },
    validate,
    onSubmit: (data: any) => {
      console.log('submit data', data)
    }
  })
  const formikConstants = {
    initialValues: {
      title: '',
      description: '',
      price: 0,
      category: '',
    },
    onSubmit: (data: any) => {
      console.log('submit data', data)
    }
  }

  const formikInitialValues = {
    title: '',
    description: '',
    price: 0,
    category: '',
  }

  async function testSubmit(): Promise<void>
  {
    console.log('testing submit');
    let formData = null;
    if (fileList !== null && fileList.length) {
      formData = new FormData()
      for (const {file} of fileList) {
        formData.append('files', file)
      }
    }

    if (formData) {
      // await save temporary images
    }

    // await save text images


    
    if (fileList !== null && fileList.length && !temporaryImagesSaved) {
      alert('unsaved images found, do you wish to proceed?')
    }
  }

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

  async function saveImages(): Promise<void>
  {
    const saveImagesFormObject = new FormData();

    // saveImagesFormObject.
    // save images
    // for (const image of images) {
    //   saveImagesFormObject.append('images', image)
    // }

    // call endpoint to post data
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setListingTextData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
  }

  function handleSetDropdownValue(item: any): void
  {
    if (!item) {
      return;
    }
    // if (!(listingTextData?.category && item?.id)) {
    //   return;
    // }
    if (listingTextData.category === item.id) {
      setListingTextData({
        ...listingTextData,
        category: ''
      });
      return;
    }
    setListingTextData((prevState: IListingTextData) => ({
      ...prevState,
      category: item.id
    }));
    
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

  function handleFileUpload(event: ChangeEvent<HTMLInputElement>): void
  {
    const files = event.target.files;
    if (!files) {
      return;
    }

    if (fileList?.length === 3) {
      return;
    }
    let fileListPointer = fileList;

    let customFilesList: IFiles[] = [];
    let currentFileCount = 0;
    for (const file of files) {
      currentFileCount++;
      if (currentFileCount > 3) {
        return;
      }
      customFilesList.push({
        file: file,
        previewUrl: URL.createObjectURL(file)
      })
      // if (!customFilesList?.length) {
      //   customFilesList = [{
      //     file: file,
      //     previewUrl: URL.createObjectURL(file)
      //   }]
      // } else {
      //   customFilesList.push({
      //     file: file,
      //     previewUrl: URL.createObjectURL(file)
      //   })
      // }
      
      // debugger
      // if (!fileList?.length) {
      //   setFileList([{
      //     file: file,
      //     previewUrl: URL.createObjectURL(file)
      //   }])
      //   console.log('setting file list, first item', file);
        
      // } else {
      //   // if (!fileList) return;
      //   console.log('setting file list, second item', file);

      //   setFileList((previousValue) => (
      //     [
      //       ...(Array.isArray(previousValue) ? previousValue : []),
      //       {
      //         file: file,
      //         previewUrl: URL.createObjectURL(file)
      //       }
      //     ]
      //   ))
      // }
      // setFileList(())
      // fileList?.push({
      //   file: file,
      //   previewUrl: URL.createObjectURL(file)
      // })
      // imagesArray.push(URL.createObjectURL(file))
    }
    if (fileList?.length) {
      let totalFileCount = fileList.length + customFilesList.length;
      let fileCountToRemove = totalFileCount > 3 ? totalFileCount - 3 : 0;
      if (fileCountToRemove) {
        customFilesList.slice(0, fileCountToRemove--);
      }
      // let excessFileCount = fileList.length % customFilesList.length;
      // console.log('excess file count found', {
      //   before: customFilesList
      // });
      
      // debugger
      // excessFileCount && customFilesList.slice(0, excessFileCount--);
      // console.log('excess file count found', {
      //   after: customFilesList
      // });
      // debugger
      setFileList((previousFiles) => (
        [
          ...(previousFiles?.length ? previousFiles : []),
          ...customFilesList
        ]
      ))
      return;
    }
    // if files > available space in set files RETURN and not execute
    // if (fileList?.length) {
    //   let excessFileCount = fileList.length % customFilesList.length;
    //   console.log('excess file count found');
      
    //   debugger
    //   excessFileCount && customFilesList.slice(0, excessFileCount--);
    // }
    setFileList(customFilesList);
    // setImagePreviewUrls(imagesArray)
  }

  function handleImageDelete(fileToDelete: IFiles, index: number): void
  {
    if (!fileList) {
      return;
    }

    const modifiedFileList = fileList.filter((file) => file.previewUrl !== fileToDelete.previewUrl);
    setFileList(modifiedFileList);

    URL.revokeObjectURL(fileToDelete.previewUrl);
  }

  return (
    <div className={styles.create_listing__container}>
      <h2 style={{padding: '1rem'}}>Create listing</h2>
      <div className={styles.create_listing__form_sections}>
        <section className={styles.listing_details__container}>
          <Formik
            initialValues={formikInitialValues}
            validate={validate}
            onSubmit={testSubmit}
          >
          <Form className={styles.listing__form_container}>
            <div
              style={{display: 'flex', flexDirection: 'column', rowGap: '0.5rem'}}
            >
              <div
                style={{display: 'flex', flexDirection: 'column'}}
              >
                <label htmlFor="category">Category</label>
                <Field
                  component={FormikDropdown}
                  items={categories?.data}
                  itemKey='id'
                  itemValue='name'
                  name='category'
                />
              </div>

              <div
                style={{display: 'flex', flexDirection: 'column'}}
              >
                <label htmlFor="title">Title</label>
                <Field component={FormikInput} type="text" name="title" id="title" />
              </div>
              
              <div
                style={{display: 'flex', flexDirection: 'column'}}
              >
                <label htmlFor="price">Price</label>
                <Field component={FormikInput} type="text" name="price" id="price" />
              </div>
              
              <div
                style={{display: 'flex', flexDirection: 'column'}}
              >
                <label htmlFor="description">Description</label>
                <Field component={FormikInput} type="text" name="description" id="description" />
              </div>
              
              <br />
            </div>

            {/* <div>
              <label htmlFor="image">Image</label>
              <Input type="file" name="image" id="image" ref={fileUploadRef} accept="image/*" multiple onChange={onFileChange} />
            </div> */}

            <div className={styles.listing__image_container}>
              {imagePreviewUrls?.map((image, index) => (
                <div key={index} className={styles.listing__image_flex}>
                  <img src={image} alt="" className={styles.listing__image}/>
                  <button type='button' onClick={() => removeImage(image, index)}>Delete</button>
                </div>
              ))}
            </div>

            <Button disabled={isFormValid} type='submit' style={{
              marginTop: '2rem',
              width: '100%',
              borderRadius: '0.6rem'
            }}>Post Listing</Button>
            <div>
              <div>
                <span className={`material-icons-outlined`}>
                  error_outline
                </span>
                <span>Warning</span>
              </div>
              <span>Message</span>
            </div>
          </Form>
          </Formik>
        </section>

        <section
          className={styles.listing__file_container}
        >
          <div
            className={styles.listing__file_header}
          >
            Images
            
            <div style={{
              position: 'relative'
            }}>
              <Button>
                Select files
                <span className={`material-icons-outlined`}>
                  upload_file
                </span>
              </Button>
              <input 
                style={{
                  position: 'absolute',
                  height: '100%',
                  width: '100%',
                  left: 0,
                  opacity: 0,
                }}
                type='file'
                multiple
                onChange={handleFileUpload}
              />
            </div>
              
          </div>
          
          
          {!!(fileList?.length) && <>
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
                  onClick={() => handleImageDelete(image, index)}
                >
                  <span className={`material-icons-outlined`}>
                    delete
                  </span>
                </div>
                {/* <div
                  style={{
                    position: 'absolute',
                    right: '-0.8rem',
                    top: '-0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleImageDelete(image, index)}
                >
                  <span className={`material-icons-outlined`}>
                    cancel
                  </span>
                </div> */}
              </li>
            ))}
          </ul>
          <Button>
            Save changes
          </Button>
        </>}
        </section>
        
      </div>
    </div>
  )
}
