export interface IUpdatedListingImageParams {
  updateImageFormData: FormData | undefined
  id: string | undefined
}

export interface ICreateListingParams {
  createListingFormData: FormData | undefined
}
export interface IGetListingsParams {
  perPage?: number
  page?: number
}