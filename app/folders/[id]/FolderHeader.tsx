'use client'

import { useState } from 'react'
import { FolderType } from "@/app/types/folderTypes"
import { useRouter } from 'next/navigation'

import Modal from '@/app/components/ui/modal/Modal'
import Spinner from '@/app/components/ui/spinner/Spinner'


type FolderHeaderParams = {
  folder: FolderType
}

export default function FolderHeader({ folder }: FolderHeaderParams) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false)
  const [isError, setIsError] = useState(false)

  const deleteFolder = async () => {
    if (isDeleting) return
    setIsDeleting(true)
    const resp = await fetch(`/api/folders/${folder?.id}/delete`, {
      method: 'DELETE'
    })

    if (resp.status !== 200) {
      setIsError(true)
      setIsDeleting(false)
      return
    } else {
      setIsError(false)
      setIsDeleting(false)
      router.push('/folders') 
    }       
  }

  return (
    <>
      <h1 className="text-2xl font-semibold mb-2 flex justify-between">
        <span>{folder?.name}</span>
        <button onClick={() => setDeleteModalOpen(true)} className="bg-red-500 hover:bg-red-500/80 rounded-lg px-4 py-2 text-sm font-normal text-white">Delete</button>      
      </h1>

      <Modal open={isDeleteModalOpen} onClose={() => setDeleteModalOpen(isDeleting || false)}>
        <div>
          {isError && <p className="text-red-500 text-sm mb-4 text-center">An error occurred. Please try again.</p>}
          <h3 className="mb-4 text-center font-semibold">Delete Folder</h3>
          <p className="mb-8">Are you sure you want to delete this folder?</p>
          <div className="flex justify-between">
            <button onClick={() => setDeleteModalOpen(isDeleting || false)} type="button" className="hover:bg-gray-50 border rounded-lg px-4 py-2 text-sm">Cancel</button>
            <button onClick={deleteFolder} className="bg-red-500 hover:bg-red-600/80 rounded-lg px-4 py-2 text-sm text-white flex items-center">
              <span>Delete</span>
              {isDeleting && 
                <div className="ml-2 mt-[2px]">
                  <Spinner />
                </div>
              }
            </button>
          </div>
        </div>
      </Modal>
    </>
  )
}