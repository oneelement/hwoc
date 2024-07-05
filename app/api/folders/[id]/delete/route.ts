import { NextRequest, NextResponse } from "next/server"
import { deleteFolder } from "@/app/lib/db/folders"
import handleApiCatch from "@/app/api/handleApiCatch"

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
  try {
    const { id } = context.params

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const result = await deleteFolder({ id })
    return NextResponse.json(result)
  } catch (error: unknown) {
    handleApiCatch(error)
  }
}