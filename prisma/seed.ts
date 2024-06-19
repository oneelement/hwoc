import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const imagePath = '/images/destinations'

const destinations = [
  {
    name: 'Cádiz',
    country: 'Spain',
    image: `${imagePath}/cádiz.webp`
  },
  {
    name: 'Marmaris',
    country: 'Turkey',
    image: `${imagePath}/marmaris.webp`
  },
  {
    name: 'Ishigaki',
    country: 'Japan',
    image: `${imagePath}/ishigaki.webp`
  },
  {
    name: 'Crete',
    country: 'Greece',
    image: `${imagePath}/crete.webp`
  },
  {
    name: 'Great Barrier Reef',
    country: 'Australia',
    image: `${imagePath}/great barrier reef.webp`
  },
  {
    name: 'Algarve',
    country: 'Portugal',
    image: `${imagePath}/algarve.webp`
  },
  {
    name: 'Bora Bora',
    country: 'French Polynesia',
    image: `${imagePath}/bora bora.webp`
  },
  {
    name: 'Seychelles',
    country: 'Seychelles',
    image: `${imagePath}/seychelles.webp`
  },
  {
    name: 'Essaouira',
    country: 'Morocco',
    image: `${imagePath}/essaouira.webp`
  },
  {
    name: 'Vanuatu',
    country: 'Vanuatu',
    image: `${imagePath}/vanuatu.webp`
  },
  {
    name: 'Sanremo',
    country: 'Italy',
    image: `${imagePath}/sanremo.webp`
  },
  {
    name: 'Tahiti',
    country: 'French Polynesia',
    image: `${imagePath}/tahiti.webp`
  }
]

async function main() {
  for (const destination of destinations) {
    await prisma.destination.create({
      data: destination
    })
  }
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })