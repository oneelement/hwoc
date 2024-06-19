import { NextRequest, NextResponse } from "next/server"
import { addDestinationToFolder, voteFolderDestination } from "@/app/lib/db/folders"
import handleApiCatch from "@/app/api/handleApiCatch"

export async function POST(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params
    const { destinationId, vote } = await request.json()

    if (!destinationId) {
      return NextResponse.json({ error: 'Destination ID is required' }, { status: 400 })
    }

    const result = await voteFolderDestination({ folderId: id, destinationId, vote })
    return NextResponse.json(result)
  } catch (error: unknown) {
    handleApiCatch(error)
  }
}