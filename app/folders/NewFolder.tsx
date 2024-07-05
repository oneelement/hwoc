'use client'

import { useEffect, useState, useRef } from 'react'
import { handleCreateFolder } from '@/app/actions/folders/actions'

import Modal from '@/app/components/ui/modal/Modal'
import Spinner from '@/app/components/ui/spinner/Spinner'

import { useFolderModalStore } from '@/app/lib/store/folderModalStore'
export default function NewFolder() {
  const [isSaving, setIsSaving] = useState(false)
  const isFolderModalOpen = useFolderModalStore((state) => state.isOpen)
  const closeFolderModal = useFolderModalStore((state) => state.close)

  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isFolderModalOpen) {
      nameInputRef.current?.focus()
    }
  }, [isFolderModalOpen])

  const handleNewFolderSumbit = async (formData: FormData) => {
    if (isSaving) return
    setIsSaving(true)
    const name = formData.get('name') as string
    await handleCreateFolder({ name })
    closeFolderModal()
    setIsSaving(false)
  }

  return (
    <Modal open={isFolderModalOpen} onClose={closeFolderModal}>
      <form action={handleNewFolderSumbit}>
        <h3 className="mb-4 text-center font-semibold">New Folder</h3>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input required ref={nameInputRef} type="text" name="name" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm" />
        </div>
        <div className="flex justify-between">
          <button onClick={closeFolderModal} type="button" className="hover:bg-gray-50 border rounded-lg px-4 py-2 text-sm">Cancel</button>
          <button type="submit" className="bg-primary-600 hover:bg-primary-600/80 rounded-lg px-4 py-2 text-sm flex items-center">
            <span>Save</span>
            {isSaving && 
              <div className="ml-2 mt-[2px]">
                <Spinner />
              </div>
            }
          </button>
        </div>
      </form>
    </Modal>
  )
}