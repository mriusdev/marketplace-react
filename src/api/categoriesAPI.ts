import { api } from "."

export const getAllCategories = () => {
  return api.get('/categories').then((res) => res.data);
}