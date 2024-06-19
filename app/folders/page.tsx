import FolderHeader from './FolderHeader'
import FolderCard from './FolderCard'
import FoldersEmptyState from './FoldersEmptyState'
import { getFolders } from '@/app/lib/db/folders'
import { getFavorites } from '@/app/lib/db/favorites'
import FavoriteCard from './FavoriteCard'

export default async function Folders() {
  const folders = await getFolders()
  const favorites = await getFavorites()

  return (
    <div>
      <FolderHeader />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
        {folders.map(folder => (
          <FolderCard key={folder.id} {...folder} />
        ))}
        {folders.length === 0 && (
          <div className="col-span-4">
            <FoldersEmptyState />
          </div>
        )}
      </div>
      <h2 className="text-xl font-semibold mb-4">My favourite destinations</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-0 mb-4">
        {favorites.map(destination => (
          <FavoriteCard key={destination.id} {...destination} /> 
        ))}
      </div>      
    </div>
  )
}