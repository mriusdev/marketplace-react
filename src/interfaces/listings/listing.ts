import { ICategory } from "../categories/categories"

export interface IListingImages {
  id: number
  imageLocation: string
}
export interface IListing {
  id?: number
  price: string
  title: string
  description?: string
  author?: {
    username: string
  }
  category?: ICategory
  createdAt: string
  listingImages: IListingImages[]
}