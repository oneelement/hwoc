'use server'

import { createFolder } from '@/app/lib/db/folders'
import { revalidatePath } from 'next/cache'

export async function handleCreateFolder({ name }: { name: string } ) {
  await createFolder({ name })
  revalidatePath('/folders')
}