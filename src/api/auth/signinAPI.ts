import { ISigninData } from "../../interfaces";
import { api } from "../apiConfig";
import { ILoginReturnData } from "../../interfaces/auth/login-return-data";

export const loginUser = async (body: ISigninData): Promise<ILoginReturnData> => {
  return await api.post('/auth/login', body).then((res) => res.data);
}
