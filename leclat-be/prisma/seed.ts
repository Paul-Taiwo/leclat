import { PrismaClient } from '@prisma/client';
import { hash } from 'argon2';

const prisma = new PrismaClient();

const alpha = Array.from(Array(26)).map((e, i) => i + 65);
const alphabet = alpha.map((x) => String.fromCharCode(x));

async function main() {
  /* Creating an array of classes. */
  const classes = [];

  for (let level = 1; level < 4; level += 1) {
    for (let i = 0; i < alphabet.length; i += 1) {
      classes.push({ name: `ND ${level}-${alphabet[i]}` });
    }
  }

  const password = await hash(process.env.ADMIN_PASS);

  /* Creating a new admin user with the email admin@leclat.io and password admin. */
  await prisma.admin.upsert({
    where: { email: 'admin@leclat.io' },
    update: {},
    create: {
      email: 'admin@leclat.io',
      name: 'Admin',
      password,
    },
  });

  /* Creating new classes in the database. */
  await prisma.class.createMany({
    data: [...classes],
    skipDuplicates: true,
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
