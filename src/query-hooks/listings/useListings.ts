import { useQuery } from "@tanstack/react-query";
import { getListings } from "../../api/listings/listingsAPI";
import { IGetListingsParams } from "../../interfaces/listings/listingAPI";

export default function useListings({ page, category }: IGetListingsParams) {
  return useQuery(['listings', { page: page, category: category }], () => getListings({ page, category }))
}
