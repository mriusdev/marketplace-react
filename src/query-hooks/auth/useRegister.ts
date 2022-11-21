import { registerUser } from "../../api";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ISignupData } from "../../interfaces";

// TODO we dont really need await here
export default function useRegister() {
  return useMutation(registerUser)
}
