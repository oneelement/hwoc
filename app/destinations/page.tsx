import { getDestinations } from '@/app/lib/db/destinations'
import DestinationCard from '@/app/components/ui/destinations/DestinationCard'

export default async function Destinations() {
  const destinations = await getDestinations()
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">My destinations</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 mb-4">
        {destinations.map(destination => (
          <DestinationCard key={destination.id} {...destination} />            
        ))}
      </div>
    </div>
  )
}