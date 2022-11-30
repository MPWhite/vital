import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient();

const testUsers = [
  {
    id: 1,
    email: 'mattp.white95+test-user-1@gmail.com',
    displayName: 'Test User 1',
    hashedPassword: '$2b$10$.UKh8XierZouL3w.xmICje0mV3KQrngd9QUgsZ8ctyPVvITqDuBYu',
  },
  {
    id: 2,
    email: 'mattp.white95+test-user-2@gmail.com',
    displayName: 'Test User 2',
    hashedPassword: '$2b$10$.UKh8XierZouL3w.xmICje0mV3KQrngd9QUgsZ8ctyPVvITqDuBYu',
  }
]


async function main() {
  for (const user of testUsers) {
    await prisma.user.upsert({
      where: {id: user.id},
      update: {
        ...user
      },
      create: {
        ...user
      }
    })
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
