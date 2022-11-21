import { IRefreshTokenReturnData } from "../../interfaces/auth/refresh-token-return-data";
import { api } from "../apiConfig";

// interface IRefreshToken

export const refreshToken = async (): Promise<IRefreshTokenReturnData> => {
  return await api.post('/auth/refresh', { withCredentials: true }).then((res) => res.data);
}
