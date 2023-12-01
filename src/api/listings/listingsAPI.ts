import { IListing } from "../../interfaces"
import { ICreateListingParams, IGetListingsParams, IUpdatedListingImageParams } from "../../interfaces/listings/listingAPI"
import { IFormData } from "../../pages/listings/listing/Listing"
import { ITemporaryImages } from "../../query-hooks/listings/usePostTemporaryImages"
import { IUpdatedListingParams } from "../../query-hooks/listings/useUpdateListing"
import { ListingFilters } from "../../states/General"
import { api, privateAPI } from "../apiConfig"

export interface IUpdatedListing {
  status: number,
  message: string
  data: IListing
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

export const saveTemporaryImages = async (temporaryImages: ITemporaryImages): Promise<any> => {
  return await privateAPI.postForm('/listings/temporary-images', temporaryImages).then((response) => response.data)
}
