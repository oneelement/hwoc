import Image from 'next/image'
import FavoriteButton from './FavoriteButton'
import clsx from 'clsx'

type DestinationCardProps = {
  id: string,
  name: string,
  country: string,
  image: string,
  isFavorite?: boolean,
  disableFavorite?: boolean
}

export default function DestinationCard({ id, name, country, image, isFavorite, disableFavorite = false }: DestinationCardProps) {
  return (
    <div 
      className={
        clsx(
          'mb-2 relative select-none bg-white p-2 rounded-lg'
        )
      }
    >
      {!disableFavorite && 
        <FavoriteButton destinationId={id} favorited={isFavorite} />
      }
     <Image src={image} alt={name} width="640" height="403" className="rounded-lg mb-2" draggable={false} />
      <p className="font-semibold">{name}, {country}</p>
    </div>
  )
}