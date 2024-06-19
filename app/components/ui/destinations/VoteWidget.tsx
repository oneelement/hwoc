'use client'

import UpIcon from '@/app/components/ui/icons/Up'
import DownIcon from '@/app/components/ui/icons/Down'
import clsx from 'clsx'
import useVote from '@/app/hooks/useVote'

type VoteType = {
  upVotes: number
  downVotes: number
  votes: number
}

type VoteWidgetProps = {
  id: string,
  votes: VoteType[],
  folderId: string
}

export default function VoteWidget({ id, votes, folderId }: VoteWidgetProps) {
  const { currentVote, votesCount, handleVote, loading } = useVote(id, votes, folderId)

  return (
    <div className={clsx(
      "absolute inset-0 duration-700 ease-in-out",
      {
        "opacity-0 translate-y-4": loading,
        "opacity-100 translate-y-0": !loading
      }
    )}>
      {!loading && 
        <div className="absolute inset-0 flex justify-center items-center">        
          <div
            className={clsx(
              "mr-4",
              {
                "fill-white/70 hover:fill-white cursor-pointer": !currentVote,
                "opacity-0": currentVote === 'up',
                "fill-primary-500 cursor-not-allowed": currentVote === 'down'
              }
            )} 
            onClick={() => !currentVote && handleVote('down')}
          >
            <DownIcon className="h-8 w-8" />
          </div>
          <div className="bg-white/90 px-3 py-2 rounded-lg font-semibold">{votesCount} {votesCount === 1 ? 'vote' : 'votes'}</div>
          <div
            className={clsx(
              "ml-4",
              {
                "fill-white/70 hover:fill-white cursor-pointer": !currentVote,
                "opacity-0": currentVote === 'down',
                "fill-primary-500 cursor-not-allowed": currentVote === 'up'
              }
            )}
            onClick={() => !currentVote && handleVote('up')}
          >
            <UpIcon className="h-8 w-8 " />
          </div>        
        </div> 
      }
    </div>   
  )
}