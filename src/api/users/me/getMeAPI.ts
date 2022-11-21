import { IGetMeReturnData } from "../../../interfaces/users/get-me-return-data";
import { api } from "../../apiConfig";

export const getMe = async (): Promise<IGetMeReturnData> => {
  return await api.get('/users/me', {
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('at') || '{}')}`
    }
  }).then((res) => res.data);
}
