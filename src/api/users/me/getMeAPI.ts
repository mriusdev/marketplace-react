import { IGetMeReturnData } from "../../../interfaces/users/get-me-return-data";
import { privateAPI } from "../../apiConfig";

export const getMe = async (): Promise<IGetMeReturnData> => {
  return await privateAPI.get('/users/me').then((res) => res.data);
}
