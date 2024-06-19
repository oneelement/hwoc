'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'

type DestinationType = {
  id: string,
  name: string,
  country: string,
  image: string
}

type FolderProps = {
  id: string,
  name: string,
  destinations: DestinationType[]
}

export default function Folder({ id, name, destinations }: FolderProps) {
  const router = useRouter()

  const [folderDestinations, setFolderDestinations] = useState(destinations)
  const [isOver, setIsOver] = useState(false)

  const handleDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsOver(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsOver(false)
  }, [])

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsOver(false)
    const destinationString = event.dataTransfer.getData('text/plain')
    const destination = JSON.parse(destinationString)

    // update destinations state for quicker UI update
    setFolderDestinations((prev) => {
      if (prev.find((dest) => dest.id === destination.id)) {
        return prev
      }
      return [...prev, destination]
    })

    // api call to add destination to folder
    const updatedFolder = await fetch(`/api/folders/${id}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ destinationId: destination.id }),
      cache: 'no-cache'
    })
    if (updatedFolder.ok) {
      router.refresh()
    }    
  }

  return (
    <div className="mt-6" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      <a href={`/folders/${id}`} className="">
        <div className="bg-primary-600 pt-4 rounded-lg relative aspect-[4/3] shadow-inner">
          <div className="absolute bg-primary-600 rounded-tl-lg rounded-tr-[16px] left-0 h-12 w-[70%] -top-3">
            <div className="pl-2 pt-2 text-xs truncate">{name}</div>
          </div>
          <div 
            className={
              clsx(
                "rounded-lg hover:bg-primary-500/80 p-2 shadow relative h-full",
                {
                  "bg-primary-500": !isOver,
                  "bg-primary-600 border-2 border-gray-100 shadow-lg": isOver
                }
              )
            }>
              <div className="grid grid-cols-2 gap-2">
                {folderDestinations.sort((a, b) => a.name.localeCompare(b.name)).slice(0, 3).map((destination) => (
                  <Image key={destination.id} width="640" height="403" src={destination.image} alt={destination.name} className="rounded-lg" />
                ))}
                {folderDestinations.length > 3 && (
                  <div className="flex items-center justify-center font-semibold text-sm">
                    +{folderDestinations.length - 3} more
                  </div>              
                )}
              </div>
          </div>
        </div>                  
      </a>
    </div> 
  )
}