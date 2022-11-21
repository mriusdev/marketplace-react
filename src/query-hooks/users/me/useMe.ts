import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../../api";

export default function useMe() {
  return useQuery({
    queryKey:['me'],
    queryFn: getMe,
    retry: false
  })
}