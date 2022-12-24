import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUpdatedListing, updateListing } from "../../api/listings/listingsAPI";
import { IListing } from "../../interfaces";
import { IFormData } from "../../pages/listings/listing/Listing";


export interface IUpdatedListingParams {
  formData: IFormData
  id: string | undefined
}

export default function useUpdateListing({formData, id}: IUpdatedListingParams) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateListing,
    onSuccess: (response: any) => {
      console.log('after query update', response);
      
      queryClient.invalidateQueries(['listings', id])
    }
  })
}
