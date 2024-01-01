// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { updateListingImage } from "../../api/listings/listingsAPI";

// type Props = {
//   id: string | undefined
// }

// export default function useUpdateListingImage({id}: Props) {
//   const queryClient = useQueryClient()

//   return useMutation({
//     mutationFn: updateListingImage,
//     onSuccess: (response: any) => {
//       console.log('after query update', response);
      
//       queryClient.invalidateQueries(['listings', id])
//     }
//   })
// }
