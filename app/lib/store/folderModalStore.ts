import { create } from 'zustand'

type FolderModalStore = {
  isOpen: boolean
  open: () => void
  close: () => void
}

export const useFolderModalStore = create<FolderModalStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false })
}))