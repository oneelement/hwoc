import { NextRequest, NextResponse } from "next/server"
import { toggleFavorite } from "@/app/lib/db/favorites"
import handleApiCatch from "../handleApiCatch"

export async function POST(request: NextRequest) {
  try {
    const { destinationId } = await request.json()

    if (!destinationId) {
      return NextResponse.json({ error: 'Destination ID is required' }, { status: 400 })
    }

    const result = await toggleFavorite(destinationId)
    return NextResponse.json(result)
  } catch (error: unknown) {
    handleApiCatch(error)
  }
}