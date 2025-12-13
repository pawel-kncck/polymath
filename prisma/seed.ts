import { PrismaClient } from '@/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create English Plurals module
  const englishPlurals = await prisma.module.create({
    data: {
      title: 'English Plurals',
      subject: 'LANGUAGE',
      description: 'Practice forming plural nouns in English',
      items: {
        create: [
          // Regular plurals (add -s)
          {
            type: 'TEXT',
            content: {
              prompt: 'cat',
              answer: 'cats',
              hint: 'add -s',
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: 'dog',
              answer: 'dogs',
              hint: 'add -s',
            },
          },
          // Plurals ending in -es
          {
            type: 'TEXT',
            content: {
              prompt: 'box',
              answer: 'boxes',
              hint: 'add -es',
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: 'watch',
              answer: 'watches',
              hint: 'add -es',
            },
          },
          // Plurals changing y to ies
          {
            type: 'TEXT',
            content: {
              prompt: 'baby',
              answer: 'babies',
              hint: 'change y to ies',
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: 'city',
              answer: 'cities',
              hint: 'change y to ies',
            },
          },
          // Irregular plurals
          {
            type: 'TEXT',
            content: {
              prompt: 'child',
              answer: 'children',
              hint: 'irregular plural',
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: 'mouse',
              answer: 'mice',
              hint: 'pol: mysz → myszy',
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: 'foot',
              answer: 'feet',
              hint: 'irregular plural',
            },
          },
          // No change plural
          {
            type: 'TEXT',
            content: {
              prompt: 'sheep',
              answer: 'sheep',
              hint: 'stays the same',
            },
          },
        ],
      },
    },
    include: {
      _count: {
        select: { items: true },
      },
    },
  });

  console.log(`✅ Created module: "${englishPlurals.title}"`);
  console.log(`   - ${englishPlurals._count.items} items added`);
  console.log('🌱 Seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error during seed:');
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
