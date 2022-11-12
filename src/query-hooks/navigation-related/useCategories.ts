import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../../api/categoriesAPI";


export default function useCategories() {
  return useQuery(['categories'], getAllCategories)
}