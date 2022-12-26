import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IUpdatedListingImageParams, updateListingImage } from "../../api/listings/listingsAPI";
import { IListing } from "../../interfaces";
import { IFormData } from "../../pages/listings/listing/Listing";

type Props = {
  id: string | undefined
}

export default function useUpdateListingImage({id}: Props) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateListingImage,
    onSuccess: (response: any) => {
      console.log('after query update', response);
      
      queryClient.invalidateQueries(['listings', id])
    }
  })
}
