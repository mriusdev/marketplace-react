import { IListing } from "../../interfaces"
import { ICreateListingParams, IUpdatedListingImageParams } from "../../interfaces/listings/listingAPI"
import { IFormData } from "../../pages/listings/listing/Listing"
import { IUpdatedListingParams } from "../../query-hooks/listings/useUpdateListing"
import { api, privateAPI } from "../apiConfig"

export interface IUpdatedListing {
  status: number,
  message: string
  data: IListing
}

export const getListings = async (): Promise<IListing[]> => {
  return await api.get('/listings').then((response) => response.data.data)
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
