import { IListing } from "../../interfaces"
import { api } from "../apiConfig"

export const getListings = async (): Promise<IListing[]> => {
  return await api.get('/listings').then((response) => response.data.data)
}

export const getListing = async (id: string | number): Promise<IListing> => {
  return await api.get(`/listings/${id}`).then((response) => response.data.data)
}
