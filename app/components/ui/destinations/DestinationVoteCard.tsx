import Image from 'next/image'
import FavoriteButton from './FavoriteButton'
import clsx from 'clsx'
import VoteWidget from './VoteWidget'

type VoteType = {
  upVotes: number
  downVotes: number
  votes: number
}

type DestinationVoteCardProps = {
  id: string,
  name: string,
  country: string,
  image: string,
  votes: VoteType[],
  isFavorite?: boolean,
  disableFavorite?: boolean,
  folderId: string
}

export default function DestinationVoteCard({ id, name, country, image, isFavorite, votes, disableFavorite = false, folderId }: DestinationVoteCardProps) {
  return (
    <div 
      className={
        clsx(
          'mb-2 relative select-none bg-white rounded-lg'
        )
      }
    >
      {!disableFavorite && 
        <FavoriteButton destinationId={id} favorited={isFavorite} />
      }
      <div className="relative rounded-lg overflow-hidden">
        <Image src={image} alt={name} width="640" height="403" className="rounded-lg" draggable={false} />
        <VoteWidget id={id} votes={votes} folderId={folderId} />
        <p className="absolute bottom-0 bg-black/70 w-full text-white pl-2 py-2 text-sm truncate overflow-hidden">{name}, {country}</p>
      </div>
    </div>
  )
}