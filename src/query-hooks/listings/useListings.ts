import { useQuery } from "@tanstack/react-query";
import { getListings } from "../../api/listings/listingsAPI";

export default function useListings() {
  return useQuery(['listings'], getListings)
}
