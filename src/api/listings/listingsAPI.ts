import { api } from "../apiConfig"

export const getListings = () => {
  return api.get('/listings')
}
