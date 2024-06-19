import prisma from '@/app/lib/db/client'

import getSession from '@/app/lib/db/session'

export async function getFavorites() {
  try {
    const session = await getSession()
    if (!session) {
      return []
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.id
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        destination: {
          select: {
            id: true,
            name: true,
            country: true,
            image: true
          }
        }
      }
    })

    return favorites.map(f => {
      return {
        id: f.destination.id,
        name: f.destination.name,
        country: f.destination.country,
        image: f.destination.image,
        isFavorite: true
      }
    })
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch favorites')
  }
}

export async function toggleFavorite(destinationId: string) {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error('Unauthorized')
    }
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId: session.id,
        destinationId
      }
    })

    if (existingFavorite) {
      await prisma.favorite.delete({
        where: {
          id: existingFavorite.id
        }
      })
      return { message: 'Favorite removed' }
    } else {
      await prisma.favorite.create({
        data: {
          userId: session.id,
          destinationId
        }
      })
      return { message: 'Favorite added' }
    }

  } catch (error) {
    console.error(error)
    throw new Error('Failed to update favorite')
  }
}