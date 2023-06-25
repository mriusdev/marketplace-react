import { useQuery } from "@tanstack/react-query";
import { getListings } from "../../api/listings/listingsAPI";
import { IGetListingsParams } from "../../interfaces/listings/listingAPI";

export default function useListings({ page }: IGetListingsParams) {
  // console.log('params', [
  //   perPage, page
  // ]);
  
  return useQuery(['listings', page], () => getListings({ page }))
  // return useQuery({
  //   queryKey: ['listings'],
  //   queryFn: getListings({ perPage, page })
  // })
}
