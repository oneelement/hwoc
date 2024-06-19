import { getFolderById } from "@/app/lib/db/folders"
import DestinationVoteCard from "@/app/components/ui/destinations/DestinationVoteCard"
import { calcVotes } from "@/app/lib/utils/utils"
import { VoteType } from "@/app/types/folderTypes"
import FolderEmptyState from "./FolderEmptyState"

type DestinationType = {
  id: string,
  name: string,
  country: string,
  image: string,
  votes: VoteType[]
}

const sortDesinations = (a: DestinationType, b: DestinationType) => {
  return calcVotes(b.votes) - calcVotes(a.votes)
}

export default async function Folder({ params }: { params: { id: string } }) {
  const folder = await getFolderById({ id: params.id })

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-2">{folder?.name}</h1>
      <p className="text-sm text-gray-500 mb-4">Vote for which destination floats your boat!</p>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {folder?.destinations.sort(sortDesinations).map(destination => (
          <div key={destination.id}>
            <DestinationVoteCard {...destination} disableFavorite={true} folderId={params.id} />
          </div>
        ))}
        {folder?.destinations.length === 0 && (
          <FolderEmptyState />
        )}
      </div>
    </div>
  )
}