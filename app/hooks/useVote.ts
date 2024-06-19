import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLocalStorage } from '@/app/hooks/useStorage'
import { VoteType } from '@/app/types/folderTypes'
import { calcVotes } from '@/app/lib/utils/utils'

type LocalVoteType = {
  folderId: string,
  destinations: {
    id: string,
    vote: 1 | -1
  }[]
}

export default function useVote(id: string, votes: VoteType[], folderId: string) {
  const router = useRouter()
  const [ loading, setLoading ] = useState(true)
  const [ currentVote, setCurrentVote ] = useState<'up' | 'down' | null>(null)
  const [ votesCount, setVotesCount ] = useState(calcVotes(votes))
  const [ localVotes, setLocalVotes ] = useLocalStorage<LocalVoteType[]>('folderVotes', [])

  useEffect(() => {
    const localFolderIndex = localVotes.findIndex((vote) => vote.folderId === folderId)
    if (localFolderIndex > -1) {
      const localDestinationIndex = localVotes[localFolderIndex].destinations.findIndex((dest) => dest.id === id)
      if (localDestinationIndex > -1) {
        const existingLocalVote = localVotes[localFolderIndex].destinations[localDestinationIndex].vote
        setCurrentVote(existingLocalVote === 1 ? 'up' : 'down')
      }
    }
    setLoading(false)
  }, [folderId, id, localVotes])

  const checkIfCanVote = (dir: 'up' | 'down') => {
    const localFolderIndex = localVotes.findIndex((vote) => vote.folderId === folderId)
    if (localFolderIndex > -1) {
      const localDestinationIndex = localVotes[localFolderIndex].destinations.findIndex((dest) => dest.id === id)
      if (localDestinationIndex > -1) {
        // already voted
        const existingLocalVote = localVotes[localFolderIndex].destinations[localDestinationIndex].vote
        return false
      } else {
        // add destination to local votes
        setLocalVotes((prev) => {
          return prev.map((f) => {
            if (f.folderId === folderId) {
              return {
                ...f,
                destinations: [...f.destinations, { id, vote: dir === 'up' ? 1 : -1 }]              
              }
            }
            return f
          })
        })
      }
    } else {
      // add folder and destination to local votes
      setLocalVotes((prev) => {
        return [...prev, { folderId, destinations: [{ id, vote: dir === 'up' ? 1 : -1 }] }]
      })
    }
    return true
  }

  const handleVote = async (dir: 'up' | 'down') => {
    const canVote = checkIfCanVote(dir)
    if (!canVote) { return }

    const outgoingVoteCount = votesCount
    setVotesCount(votesCount + (dir === 'up' ? 1 : -1))

    const outgoingCurrentVote = currentVote
    setCurrentVote(dir)
    
    const vote = await fetch(`/api/folders/${folderId}/vote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ destinationId: id, vote: dir }),
      cache: 'no-cache'
    })

    if (!vote.ok) {
      setVotesCount(outgoingVoteCount)
      setCurrentVote(outgoingCurrentVote)
    } else {
      router.refresh()
    }
  }

  return {
    currentVote,
    votesCount,
    handleVote,
    loading
  }
}