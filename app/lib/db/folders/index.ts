import prisma from '@/app/lib/db/client'
import getSession from '@/app/lib/db/session'

export async function createFolder({ name }: { name: string } ) {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error('Unauthorized')
    }

    const folder = await prisma.folder.create({
      data: {
        name: name,
        userId: session.id
      }
    })
    return folder
  } catch (error) {
    console.error(error)
    throw new Error('Failed to create folder')
  }
}

export async function getFolders() {
  try {
    const folders = await prisma.folder.findMany({
      orderBy: {
        createdAt: 'asc'
      },
      select: {
        id: true,
        name: true,
        destinations: {
          select: {
            id: true,
            name: true,
            country: true,
            image: true
          }
        }    
      }
    })
    return folders
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch folders')
  }
}

export async function getFolderById({ id }: { id: string }) {
  try {
    const folder = await prisma.folder.findFirst({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        destinations: {
          select: {
            id: true,
            name: true,
            country: true,
            image: true,
            votes: {
              where: {
                folderId: id
              },
              select: {
                votes: true,
                upVotes: true,
                downVotes: true
              }            
            }
          }
        }
      }
    })
    return folder
  } catch (error) {
    console.error(error)
    throw new Error('Failed to fetch folder')
  }
}

export async function addDestinationToFolder({ folderId, destinationId }: { folderId: string, destinationId: string }) {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error('Unauthorized')
    }

    const existingDestination = await prisma.folder.findFirst({
      where: {
        id: folderId,
        destinations: {
          some: {
            id: destinationId
          }
        }
      }
    })

    if (existingDestination) {
      return existingDestination
    }

    const folder = await prisma.folder.update({
      where: {
        id: folderId,
      },
      data: {
        destinations: {
          connect: {
            id: destinationId
          }
        }
      },
      select: {
        id: true,
        name: true,
        destinations: {
          select: {
            id: true,
            name: true,
            country: true,
            image: true
          }
        }
      }
    })
    return folder
  } catch (error) {
    console.error(error)
    throw new Error('Failed to add destination to folder')
  }
}

export async function voteFolderDestination({ folderId, destinationId, vote }: { folderId: string, destinationId: string, vote: 'up' | 'down'}) {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error('Unauthorized')
    }

    const existingFolderDestinationVote = await prisma.folderDestinationVote.findFirst({
      where: {
        folderId,
        destinationId
      }
    })

    if (existingFolderDestinationVote) {
      const updatedFolderDestinationVote = await prisma.folderDestinationVote.update({
        where: {
          id: existingFolderDestinationVote.id
        },
        data: {
          votes: existingFolderDestinationVote.votes + (vote === 'up' ? 1 : -1),
          upVotes: existingFolderDestinationVote.upVotes + (vote === 'up' ? 1 : 0),
          downVotes: existingFolderDestinationVote.downVotes + (vote === 'down' ? 1 : 0)
        }
      })
      return updatedFolderDestinationVote
    } else {
      const folderDestinationVote = await prisma.folderDestinationVote.create({
        data: {
          folderId,
          destinationId,
          votes: vote === 'up' ? 1 : -1,
          upVotes: vote === 'up' ? 1 : 0,
          downVotes: vote === 'down' ? 1 : 0
        }
      })
      return folderDestinationVote    
    }

  } catch (error) {
    console.error(error)
    throw new Error('Failed to vote for destination')
  }
}

export async function deleteFolder({ id }: { id: string }) {
  try {
    const session = await getSession()
    if (!session) {
      throw new Error('Unauthorized')
    }

    const folder = await prisma.folder.delete({
      where: {
        id
      }
    })
    return folder
  } catch (error) {
    console.error(error)
    throw new Error('Failed to delete folder')
  }
}