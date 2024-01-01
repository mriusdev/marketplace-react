import { IListing } from "../../interfaces"
// import { IUpdatedListingImageParams } from "../../interfaces/listings/listingAPI"
// import { IUpdatedListingParams } from "../../query-hooks/listings/useUpdateListing"
import { ListingFilters } from "../../states/General"
import { api, privateAPI } from "../apiConfig"

// Listings
export interface IPostListing {
  title: string
  description: string
  price: number
  category: number
}
export interface IUpdatedListing {
  status: number,
  message: string
  data: IListing
}

// Temporary images
export interface IPostTemporaryImages {
  files: FormData
}

export interface IUpdateListing {
  data: {
    listingTextData?: {
      title?: string | undefined
      description?: string | undefined
      price?: number | undefined
    }
    deletedListingImages?: number[] | undefined
  }
  id: string
}

const DEFAULT_PER_PAGE = 2;
const DEFAULT_PAGE = 1;

export const getListings = async ({page = DEFAULT_PAGE, category}: ListingFilters): Promise<any> => {
  return await api.get('/listings', {
    params: {
      page,
      category
    }
  }).then((response) => response.data)
}

export const createListing = async (data: IPostListing): Promise<any> => {
  return await privateAPI.post('/listings', data).then((response) => response.data)
}

export const getListing = async (id: string | number): Promise<IListing> => {
  return await api.get(`/listings/${id}`).then((response) => response.data.data)
}

export const updateListing = async (data: IUpdateListing): Promise<any> => {
  return await privateAPI.patch(`/listings/${data.id}`, data.data)
    .then((response) => response.data)
}

// export const updateListingImage = async ({updateImageFormData, id}: IUpdatedListingImageParams) => {
//   return await privateAPI.patchForm(`/listings/${id}/images`, updateImageFormData).then((response) => response.data)
// }

export const saveTemporaryImages = async ({files}: IPostTemporaryImages): Promise<any> => {
  return await privateAPI.postForm('/listings/temporary-images', files).then((response) => response.data)
}
