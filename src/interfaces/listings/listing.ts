import { ICategory } from "../categories/categories"

export interface IListing {
  id: number
  price: string
  title: string
  description?: string
  author: {
    username: string
  }
  category: ICategory
}