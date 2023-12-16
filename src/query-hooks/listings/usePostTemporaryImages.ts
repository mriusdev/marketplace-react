import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveTemporaryImages } from "../../api/listings/listingsAPI";

export default function usePostTemporaryImages() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: saveTemporaryImages,
    onSuccess: () => {
      queryClient.invalidateQueries(['listings'])
    }
  })
}
