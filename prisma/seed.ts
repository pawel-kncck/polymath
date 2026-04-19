import 'dotenv/config';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new (PrismaClient as any)({ adapter });

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!email || !password) {
    console.log(
      'ℹ️  Skipping admin seed — ADMIN_EMAIL and ADMIN_PASSWORD not set.'
    );
    return;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const admin = await prisma.user.upsert({
    where: { email },
    update: { passwordHash, role: 'ADMIN' },
    create: {
      email,
      name: email.split('@')[0],
      role: 'ADMIN',
      passwordHash,
    },
  });
  console.log(`✅ Admin user ready: ${admin.email}`);
}

async function main() {
  console.log('🌱 Starting database seed...');

  await seedAdmin();

  // --- English Plurals: single-language (English only) ---
  // This module teaches English pluralization. Hints are in English.
  const englishPlurals = await prisma.module.create({
    data: {
      title: { en: 'English Plurals' },
      description: { en: 'Practice forming plural nouns in English' },
      subject: 'LANGUAGE',
      languages: ['en'],
      items: {
        create: [
          {
            type: 'TEXT',
            content: {
              prompt: { en: 'cat' },
              answer: { en: 'cats' },
              hint: { en: 'add -s' },
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: { en: 'dog' },
              answer: { en: 'dogs' },
              hint: { en: 'add -s' },
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: { en: 'box' },
              answer: { en: 'boxes' },
              hint: { en: 'add -es' },
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: { en: 'watch' },
              answer: { en: 'watches' },
              hint: { en: 'add -es' },
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: { en: 'baby' },
              answer: { en: 'babies' },
              hint: { en: 'change y to ies' },
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: { en: 'city' },
              answer: { en: 'cities' },
              hint: { en: 'change y to ies' },
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: { en: 'child' },
              answer: { en: 'children' },
              hint: { en: 'irregular plural' },
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: { en: 'mouse' },
              answer: { en: 'mice' },
              hint: { en: 'irregular plural' },
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: { en: 'foot' },
              answer: { en: 'feet' },
              hint: { en: 'irregular plural' },
            },
          },
          {
            type: 'TEXT',
            content: {
              prompt: { en: 'sheep' },
              answer: { en: 'sheep' },
              hint: { en: 'stays the same' },
            },
          },
        ],
      },
    },
    include: { _count: { select: { items: true } } },
  });

  console.log(`✅ Created module: "English Plurals" (${englishPlurals._count.items} items, en-only)`);

  // --- General Knowledge: bilingual (PL + EN) ---
  const generalKnowledge = await prisma.module.create({
    data: {
      title: {
        pl: 'Wiedza ogólna',
        en: 'General Knowledge',
      },
      description: {
        pl: 'Krótkie pytania jednokrotnego wyboru na rozgrzewkę',
        en: 'Quick single-choice questions to warm up',
      },
      subject: 'LOGIC',
      languages: ['pl', 'en'],
      items: {
        create: [
          {
            type: 'SINGLE_CHOICE',
            content: {
              prompt: {
                pl: 'Która planeta jest najbliżej Słońca?',
                en: 'Which planet is closest to the Sun?',
              },
              options: {
                pl: ['Wenus', 'Merkury', 'Ziemia', 'Mars'],
                en: ['Venus', 'Mercury', 'Earth', 'Mars'],
              },
              answer: { pl: 'Merkury', en: 'Mercury' },
            },
          },
          {
            type: 'SINGLE_CHOICE',
            content: {
              prompt: {
                pl: 'Ile jest kontynentów?',
                en: 'How many continents are there?',
              },
              options: {
                pl: ['5', '6', '7', '8'],
                en: ['5', '6', '7', '8'],
              },
              answer: { pl: '7', en: '7' },
            },
          },
          {
            type: 'SINGLE_CHOICE',
            content: {
              prompt: {
                pl: 'Który ocean jest największy na Ziemi?',
                en: 'What is the largest ocean on Earth?',
              },
              options: {
                pl: ['Atlantycki', 'Indyjski', 'Arktyczny', 'Spokojny'],
                en: ['Atlantic', 'Indian', 'Arctic', 'Pacific'],
              },
              answer: { pl: 'Spokojny', en: 'Pacific' },
            },
          },
          {
            type: 'SINGLE_CHOICE',
            content: {
              prompt: {
                pl: 'Który gaz jest pochłaniany przez rośliny w procesie fotosyntezy?',
                en: 'Which gas do plants absorb from the air for photosynthesis?',
              },
              options: {
                pl: ['Tlen', 'Azot', 'Dwutlenek węgla', 'Wodór'],
                en: ['Oxygen', 'Nitrogen', 'Carbon dioxide', 'Hydrogen'],
              },
              answer: { pl: 'Dwutlenek węgla', en: 'Carbon dioxide' },
              hint: {
                pl: 'Ludzie go wydychają',
                en: 'Humans breathe it out',
              },
            },
          },
          {
            type: 'SINGLE_CHOICE',
            content: {
              prompt: {
                pl: 'Kto namalował obraz Mona Lisa?',
                en: 'Who painted the Mona Lisa?',
              },
              options: {
                pl: ['Michał Anioł', 'Leonardo da Vinci', 'Rafael', 'Donatello'],
                en: ['Michelangelo', 'Leonardo da Vinci', 'Raphael', 'Donatello'],
              },
              answer: { pl: 'Leonardo da Vinci', en: 'Leonardo da Vinci' },
            },
          },
        ],
      },
    },
    include: { _count: { select: { items: true } } },
  });

  console.log(`✅ Created module: "General Knowledge" (${generalKnowledge._count.items} items, pl+en)`);
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
