import { PrismaClient, User, Boulder, Rating } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';

const prisma = new PrismaClient();

const testUsers: Array<User> = [
  {
    id: 1,
    email: 'mattp.white95+test-user-1@gmail.com',
    displayName: 'Test User 1',
    hashedPassword:
      '$2b$10$.UKh8XierZouL3w.xmICje0mV3KQrngd9QUgsZ8ctyPVvITqDuBYu',
    createdAt: new Date(),
  },
  {
    id: 2,
    email: 'mattp.white95+test-user-2@gmail.com',
    displayName: 'Test User 2',
    hashedPassword:
      '$2b$10$.UKh8XierZouL3w.xmICje0mV3KQrngd9QUgsZ8ctyPVvITqDuBYu',
    createdAt: new Date(),
  },
];

const testBoulders: Array<Boulder> = [
  {
    id: 1,
    name: 'Test Boulder 1',
    rating: 'RED',
    xLocation: 10.1,
    yLocation: 10.1,
    addedById: 1,
    namedById: null,
    active: true,
    removedAt: null,
    createdAt: new Date(),
  },
];

async function main() {
  for (const user of testUsers) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {
        ...user,
      },
      create: {
        ...user,
      },
    });
  }
  for (const boulder of testBoulders) {
    const { id, ...boulderData } = boulder;
    await prisma.boulder.upsert({
      where: { id: boulder.id },
      update: {
        ...boulderData,
      },
      create: {
        ...boulderData,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
