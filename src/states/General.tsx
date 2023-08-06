import { create } from 'zustand';

interface State {
  category: number | null
  changeCategory: (categoryId: number | null) => void
}

export const useStore = create<State>()((set) => ({
  category: null,
  changeCategory: (categoryId) => set(() => ({ category: categoryId }))
}))
