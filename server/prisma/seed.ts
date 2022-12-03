import { PrismaClient, User, Boulder, Rating } from '@prisma/client';

const prisma = new PrismaClient();

const testUsers: Array<User> = [
  {
    id: 1,
    email: 'mattp.white95+test-user-1@gmail.com',
    displayName: 'Sarah Olijar',
    profilePicUrl: 'https://dl05ydgjha0pz.cloudfront.net/sarah.png',
    hashedPassword:
      '$2b$10$.UKh8XierZouL3w.xmICje0mV3KQrngd9QUgsZ8ctyPVvITqDuBYu',
    createdAt: new Date(),
  },
  {
    id: 2,
    email: 'mattp.white95+test-user-2@gmail.com',
    displayName: 'Matt White',
    profilePicUrl: 'https://dl05ydgjha0pz.cloudfront.net/matt.jpg',
    hashedPassword:
      '$2b$10$.UKh8XierZouL3w.xmICje0mV3KQrngd9QUgsZ8ctyPVvITqDuBYu',
    createdAt: new Date(),
  },
];

const testBoulders: Array<Boulder> = [
  {
    id: 1,
    name: 'Sleepwalker (Sit start)',
    primaryPhotoUrl: 'https://dl05ydgjha0pz.cloudfront.net/boulder-image-1.png',
    rating: 'RED',
    xLocation: 60,
    yLocation: 49,
    addedById: 1,
    namedById: 1,
    active: true,
    removedAt: null,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Burden of hoop dreams. Very long',
    primaryPhotoUrl: 'https://dl05ydgjha0pz.cloudfront.net/boulder-image-2.jpg',
    rating: 'ORANGE',
    xLocation: 50,
    yLocation: 50,
    addedById: 1,
    namedById: 1,
    active: true,
    removedAt: null,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'La Dura Dura',
    primaryPhotoUrl: 'https://dl05ydgjha0pz.cloudfront.net/boulder-image-3.jpg',
    rating: 'YELLOW',
    xLocation: 50,
    yLocation: 50,
    addedById: 1,
    namedById: 2,
    active: true,
    removedAt: null,
    createdAt: new Date(),
  },
  {
    id: 4,
    name: 'Alphane',
    primaryPhotoUrl: 'https://dl05ydgjha0pz.cloudfront.net/boulder-image-4.jpg',
    rating: 'PURPLE',
    xLocation: 75,
    yLocation: 75,
    addedById: 1,
    namedById: 1,
    active: true,
    removedAt: null,
    createdAt: new Date(),
  },
];

const testBoulderCompletions = [
  {
    id: 1,
    boulderId: 1,
    userId: 1,
    attempts: 0,
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

  for (const boulderCompletion of testBoulderCompletions) {
    const { id, ...boulderCompletionData } = boulderCompletion;
    await prisma.boulderCompletion.upsert({
      where: { id: boulderCompletion.id },
      update: {
        ...boulderCompletionData,
      },
      create: {
        ...boulderCompletionData,
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
