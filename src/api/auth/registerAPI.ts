import { ISignupData } from "../../interfaces/categories";
import { api } from "../index"

export const registerUser = (body: ISignupData) => {
  return api.post('/auth/register', body).then((res) => res.data);
}