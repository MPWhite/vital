import {
  PrismaClient,
  User,
  Boulder,
  Rating,
  Location,
  Tag,
  BoulderTag,
} from '@prisma/client';

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
    holdColor: 'orange',
    location: Location.ALCOVE,
    xLocation: 60,
    yLocation: 42.5,
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
    holdColor: 'blue',
    location: Location.TOPOUT,
    xLocation: 80,
    yLocation: 40,
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
    holdColor: 'orange',
    location: Location.AMPHITHEATRE,
    xLocation: 70,
    yLocation: 60,
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
    holdColor: 'pink',
    location: Location.TOPOUT,
    xLocation: 75,
    yLocation: 35,
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
  {
    id: 2,
    boulderId: 2,
    userId: 1,
    attempts: 4,
    createdAt: new Date(),
  },
  {
    id: 3,
    boulderId: 1,
    userId: 2,
    attempts: 14,
    createdAt: new Date(),
  },
];

const testTags: Array<Tag> = [
  {
    id: 1,
    name: 'Slopers',
  },
  {
    id: 2,
    name: 'Crimps',
  },
  {
    id: 2,
    name: 'Dyno',
  },
  {
    id: 3,
    name: 'Soft',
  },
  {
    id: 4,
    name: 'Power',
  },
  {
    id: 5,
    name: 'Tricky',
  },
];

const testBoulderTags: Array<BoulderTag> = [
  {
    id: 1,
    boulderId: 1,
    tagId: 1,
    createdAt: new Date(),
  },
  {
    id: 2,
    boulderId: 1,
    tagId: 2,
    createdAt: new Date(),
  },
  {
    id: 3,
    boulderId: 2,
    tagId: 1,
    createdAt: new Date(),
  },
  {
    id: 4,
    boulderId: 3,
    tagId: 4,
    createdAt: new Date(),
  },
  {
    id: 5,
    boulderId: 4,
    tagId: 5,
    createdAt: new Date(),
  },
  {
    id: 6,
    boulderId: 3,
    tagId: 3,
    createdAt: new Date(),
  },
  {
    id: 7,
    boulderId: 4,
    tagId: 1,
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

  for (const tag of testTags) {
    const { id, ...tagData } = tag;
    await prisma.tag.upsert({
      where: { id: tag.id },
      update: {
        ...tagData,
      },
      create: {
        ...tagData,
      },
    });
  }

  for (const boulderTag of testBoulderTags) {
    const { id, ...boulderTagData } = boulderTag;
    await prisma.boulderTag.upsert({
      where: { id: id },
      update: {
        ...boulderTagData,
      },
      create: {
        ...boulderTagData,
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
