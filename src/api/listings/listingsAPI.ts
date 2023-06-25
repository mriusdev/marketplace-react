import { IListing } from "../../interfaces"
import { ICreateListingParams, IGetListingsParams, IUpdatedListingImageParams } from "../../interfaces/listings/listingAPI"
import { IFormData } from "../../pages/listings/listing/Listing"
import { IUpdatedListingParams } from "../../query-hooks/listings/useUpdateListing"
import { api, privateAPI } from "../apiConfig"

export interface IUpdatedListing {
  status: number,
  message: string
  data: IListing
}

const DEFAULT_PER_PAGE = 2;
const DEFAULT_PAGE = 1;

export const getListings = async ({perPage = DEFAULT_PER_PAGE, page = DEFAULT_PAGE}: IGetListingsParams): Promise<any> => {
  return await api.get('/listings', {
    params: {
      perPage,
      page
    }
  }).then((response) => response.data.data)
}

export const createListing = async ({createListingFormData}: ICreateListingParams) => {
  return await privateAPI.post('/listings', createListingFormData)
}

export const getListing = async (id: string | number): Promise<IListing> => {
  return await api.get(`/listings/${id}`).then((response) => response.data.data)
}

export const updateListing = async ({formData, id}: IUpdatedListingParams): Promise<any> => {
  return await privateAPI.patch(`/listings/${id}`, formData).then((response) => response.data)
}

export const updateListingImage = async ({updateImageFormData, id}: IUpdatedListingImageParams) => {
  return await privateAPI.patchForm(`/listings/${id}/images`, updateImageFormData).then((response) => response.data)
}
