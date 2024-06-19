import prisma from '@/app/lib/db/client'

export default async function getSession() {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: 'test@holiwise.com'
      }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return user
  } catch (error) {
    console.error('Error getting session:', error)
    
    throw new Error('Error getting session')
  }
}