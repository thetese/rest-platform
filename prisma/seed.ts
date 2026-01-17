import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const branch = await prisma.branch.upsert({
    where: { id: 'demo-branch' },
    update: {},
    create: { id: 'demo-branch', name: 'Main Branch', address: 'Downtown' },
  });

  const role = await prisma.role.upsert({
    where: { name: 'ADMIN' },
    update: {},
    create: { name: 'ADMIN' },
  });

  const password = await bcrypt.hash('password123', 10);

  await prisma.user.upsert({
    where: { email: 'admin@demo.com' },
    update: {},
    create: {
      email: 'admin@demo.com',
      password,
      name: 'Demo Admin',
      roleId: role.id,
      branchId: branch.id,
    },
  });

  const category = await prisma.menuCategory.create({
    data: { name: 'Burgers', branchId: branch.id },
  });

  await prisma.menuItem.create({
    data: { name: 'Classic Burger', price: 9.99, categoryId: category.id },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
