import DestinationsIcon from "@/app/components/ui/icons/Destinations"
import Link from 'next/link'

export default function FolderEmptyState() {
  return (
    <div className="col-span-4">
      <div className="my-8 w-full">
        <div className="w-full rounded-lg border-2 border-dashed border-gray-300 py-16 px-12 flex flex-col items-center focus:outline-none">
          <DestinationsIcon className="h-8 w-8 mb-2" />
          <p className="text-lg font-semibold text-gray-900 mb-2">No destinations added yet</p>
          <p className="text-sm font-semibold text-gray-900 mb-2">You can add some on the <Link href="/folders" className="underline text-blue-500">folders</Link> page</p>
        </div>
      </div>
    </div>
  )
}