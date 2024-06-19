'use client'

import { useState } from 'react'
import clsx from 'clsx'
import HeartIcon from '@/app/components/ui/icons/Heart'

import { useRouter } from 'next/navigation'

type FavoriteButtonProps = {
  destinationId: string,
  favorited?: boolean
}

export default function FavoriteButton({ destinationId, favorited = false }: FavoriteButtonProps) {
  const router = useRouter()

  const [isFavorite, setIsFavorite] = useState(favorited)

  const handleToggleFavorite = async () => {
    setIsFavorite(!isFavorite)
    const resp = await fetch(`/api/favorites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ destinationId }),
      cache: 'no-cache'
    })
    if (!resp.ok) {
      setIsFavorite(!isFavorite)
    } else {
      router.refresh()
    }
  }
  return (
    <div 
      className={clsx(
        'p-1.5 rounded-lg absolute top-3 right-3 cursor-pointer',
        {
          'fill-white/50 bg-white/20': !isFavorite,
          'fill-red-500 bg-white/80': isFavorite
        }
      )}
      onClick={handleToggleFavorite}
    >
      <HeartIcon className="h-5 w-5" />
    </div>
  )
}