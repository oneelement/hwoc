import { VoteType } from '@/app/types/folderTypes'

export function getCurrentYear(){
  return new Date().getFullYear()
}

export function calcVotes(votes: VoteType[]) {
  return votes.reduce((acc, vote) => {
    return acc + vote.votes
  }, 0)
}