'use client'

import { useFolderModalStore } from '@/app/lib/store/folderModalStore'

import FolderIcon from '@/app/components/ui/icons/Folder'
import PlusIcon from '@/app/components/ui/icons/Plus'

export default function FolderEmptyState() {
  const openFolderModal = useFolderModalStore(state => state.open)

  return (
    <div className="my-8 w-full">
      <button onClick={openFolderModal} type="button" className="w-full rounded-lg border-2 border-dashed border-gray-300 py-16 px-12 flex flex-col items-center hover:border-gray-400 focus:outline-none">
        <FolderIcon className="h-8 w-8 mb-2" />
        <p className="text-sm font-semibold text-gray-900 mb-2">No folders yet</p>
        <div className="bg-primary-500 hover:bg-vital-green-hover rounded-lg px-3 py-2 mt-2 text-sm font-base flex items-center">
          Create a new folder <PlusIcon className="h-3 w-3 ml-2" />
        </div>
      </button>
    </div>
  )
}