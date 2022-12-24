import { IListing } from "../../interfaces"
import { IFormData } from "../../pages/listings/listing/Listing"
import { IUpdatedListingParams } from "../../query-hooks/listings/useUpdateListing"
import { api, privateAPI } from "../apiConfig"

export const getListings = async (): Promise<IListing[]> => {
  return await api.get('/listings').then((response) => response.data.data)
}

export const getListing = async (id: string | number): Promise<IListing> => {
  return await api.get(`/listings/${id}`).then((response) => response.data.data)
}

export interface IUpdatedListing {
  status: number,
  message: string
  data: IListing
}

export const updateListing = async ({formData, id}: IUpdatedListingParams): Promise<any> => {
  return await privateAPI.patch(`/listings/${id}`, formData).then((response) => response.data)
}
