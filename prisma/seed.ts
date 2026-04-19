import 'dotenv/config';
import { PrismaClient } from '@/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import bcrypt from 'bcryptjs';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new (PrismaClient as any)({ adapter });

// Modules and items are NOT seeded here — they live in `src/content/` and
// travel with the code. This script only bootstraps user-specific data.
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
