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
    xLocation: 10.1,
    yLocation: 10.1,
    addedById: 1,
    namedById: null,
    active: true,
    removedAt: null,
    createdAt: new Date(),
  },
  {
    id: 2,
    name: 'Burden of hoop dreams',
    primaryPhotoUrl: 'https://dl05ydgjha0pz.cloudfront.net/boulder-image-2.jpg',
    rating: 'ORANGE',
    xLocation: 10.1,
    yLocation: 10.1,
    addedById: 1,
    namedById: null,
    active: true,
    removedAt: null,
    createdAt: new Date(),
  },
  {
    id: 3,
    name: 'La Dura Dura',
    primaryPhotoUrl: 'https://dl05ydgjha0pz.cloudfront.net/boulder-image-3.jpg',
    rating: 'YELLOW',
    xLocation: 10.1,
    yLocation: 10.1,
    addedById: 1,
    namedById: null,
    active: true,
    removedAt: null,
    createdAt: new Date(),
  },
  {
    id: 4,
    name: 'Alphane',
    primaryPhotoUrl: 'https://dl05ydgjha0pz.cloudfront.net/boulder-image-4.jpg',
    rating: 'PURPLE',
    xLocation: 10.1,
    yLocation: 10.1,
    addedById: 1,
    namedById: null,
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
