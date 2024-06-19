'use client'

import { useFolderModalStore } from '@/app/lib/store/folderModalStore'

import NewFolder from './NewFolder'

export default function FolderHeader() {
  const openFolderModal = useFolderModalStore(state => state.open)

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4 flex justify-between items-center">
        Folders
        <button onClick={openFolderModal} className="bg-primary-500 hover:bg-primary-500/80 rounded-lg px-4 py-2 text-sm font-normal">New folder</button>      
      </h1>
      <p className="text-sm text-gray-500 mb-4">Drag your favourite destinations into a folder and forward to your friends to vote on which one they like best!</p> 
      <NewFolder /> 
    </>  
  )
}