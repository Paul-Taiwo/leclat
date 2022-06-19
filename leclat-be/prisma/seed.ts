import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

async function main() {
  const password = await hash(process.env.ADMIN_PASS);

  await prisma.admin.upsert({
    where: { email: 'admin@leclat.io' },
    update: {},
    create: {
      email: 'admin@leclat.io',
      name: 'Admin',
      password,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
