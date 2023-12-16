import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createListing } from "../../api/listings/listingsAPI";

export default function useCreateListing() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createListing,
    onSuccess: () => {
      queryClient.invalidateQueries(['listings'])
    }
  })
}
