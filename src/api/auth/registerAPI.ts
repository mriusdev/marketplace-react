import { ISignupData } from "../../interfaces";
import { api } from "../apiConfig";
import { IRegisterReturnData } from "../../interfaces/auth/register-return-data";
import { AxiosError } from "axios";

export const registerUser = async (body: ISignupData): Promise<IRegisterReturnData> => {
  return api.post('/auth/register', body)
    .then((res) => res.data)
}
