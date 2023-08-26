import { useQuery } from "@tanstack/react-query";
import { getListings } from "../../api/listings/listingsAPI";
import { IGetListingsParams } from "../../interfaces/listings/listingAPI";
import { ListingFilters } from "../../states/General";

export default function useListings({ page, category }: ListingFilters) {
  return useQuery(['listings', { page: page, category: category }], () => getListings({ page, category }))
}
