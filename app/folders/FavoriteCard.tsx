'use client'

import { useState } from "react"
import DestinationCard from "@/app/components/ui/destinations/DestinationCard"

type FavoriteCardProps = {
  id: string,
  name: string,
  country: string,
  image: string,
  isFavorite: boolean
}

export default function FavoriteCard({ id, name, country, image, isFavorite }: FavoriteCardProps) {
  const [isDragging, setIsDragging] = useState(false)
  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    setIsDragging(true)
    event.dataTransfer.setData('text/plain', JSON.stringify({ id, name, country, image }))
  }
  return (
    <div
      className={`${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`} 
      draggable 
      onDragStart={handleDragStart}
      onDragEnd={() => setIsDragging(false)}
    >
      <DestinationCard id={id} name={name} country={country} image={image} isFavorite={isFavorite} />
    </div>
  )
}