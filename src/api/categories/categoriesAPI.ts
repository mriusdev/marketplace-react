import { api } from "../apiConfig";

export const getAllCategories = () => {
  return api.get('/categories').then((res) => res.data);
}