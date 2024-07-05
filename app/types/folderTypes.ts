export type VoteType = {
  upVotes: number
  downVotes: number
  votes: number
}

export type FolderType = {
  id: string,
  name: string,
  destinations: {
    id: string,
    name: string,
    country: string,
    image: string,
    votes: VoteType[]
  }[]
} | null