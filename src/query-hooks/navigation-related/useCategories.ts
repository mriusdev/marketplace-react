import { useQuery } from "@tanstack/react-query";
// import { getAllCategories } from "../../api/categoriesAPI";
import { getAllCategories } from "../../api";


export default function useCategories() {
  return useQuery(['categories'], getAllCategories)
}