import { create } from 'zustand';

export interface ListingFilters {
  category?: number | null
  page?: number
}

interface State {
  listingFilters: ListingFilters
  changeListingFilters: ({category, page}: ListingFilters) => void
}

export const useStore = create<State>()((set) => ({
  listingFilters: {
    page: 1
  },
  changeListingFilters: ({category, page}: ListingFilters) => set(() => (
    {
      listingFilters: {
        page: page,
        category: category
      }
    }
  ))
}))
