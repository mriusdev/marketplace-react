import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getListing } from "../../api/listings/listingsAPI";
import { IListing } from "../../interfaces";

export default function useListing(id: string | number) {
  // todo: change this to 'listing'
  return useQuery(['listings', id], () => getListing(id))
}
