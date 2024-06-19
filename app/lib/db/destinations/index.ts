import prisma from '@/app/lib/db/client'

import getSession from '@/app/lib/db/session'

type SelectType = {
  id: boolean
  name: boolean
  image: boolean
  country: boolean
  favorites?: {
    where: {
      userId: string
    },
    select: {
      id: boolean
    }
  }

}

export const revalidate = 0

export async function getDestinations() {
  try {
    const session = await getSession()
    
    let select: SelectType = {
      id: true,
      name: true,
      country: true,
      image: true
    }

    if (session) {
      select = {
        ...select,
        favorites: {
          where: {
            userId: session.id
          },
          select: {
            id: true
          }
        }
      }
    }

    const destinations = await prisma.destination.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      select
    })
    console.log('d ran')
    return destinations.map(destination => {
      return {
        id: destination.id,
        name: destination.name,
        country: destination.country,
        image: destination.image,
        isFavorite: destination.favorites.length > 0
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch destinations')
  }
}