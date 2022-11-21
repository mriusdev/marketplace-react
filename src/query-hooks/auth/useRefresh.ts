import { useMutation, useQuery } from "@tanstack/react-query";
import { refreshToken } from "../../api";

export default function useRefresh () {
  return useMutation(refreshToken)
}
