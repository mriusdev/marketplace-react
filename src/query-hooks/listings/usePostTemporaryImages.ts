import { useMutation } from "@tanstack/react-query";
import { saveTemporaryImages } from "../../api/listings/listingsAPI";

export interface ITemporaryImages {
  files: File[]
}

export default function usePostTemporaryImages(temporaryImages: ITemporaryImages) {
  return useMutation({
    mutationFn: saveTemporaryImages
  })
}
