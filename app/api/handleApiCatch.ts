import { NextResponse } from "next/server"

export default function handleApiCatch(error: Error | unknown) {
  if (error instanceof Error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  } else {
    return NextResponse.json({ error: 'An unknown error ocurred' }, { status: 500 })
  } 
}