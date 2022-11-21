import { UseBaseMutationResult, UseBaseQueryResult, useMutation, useQuery } from "@tanstack/react-query";
import { loginUser } from "../../api"
import { ISigninData } from "../../interfaces";

export default function useLogin() {
  return useMutation(loginUser)
}
