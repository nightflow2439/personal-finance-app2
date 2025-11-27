import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.record.deleteMany({});
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Record';`;

  const records = [
    { date: new Date(2025, 9, 1, 10, 0), amount: 100, type: "income", categories: ["工资"] },
    { date: new Date(2025, 9, 5, 15, 30), amount: 50, type: "expense", note: "买了点零食", categories: ["购物"] },
    { date: new Date(2025, 10, 1, 9, 0), amount: 120, type: "income", categories: ["奖金"] },
  ];

  for (const record of records) {
    await prisma.record.create({ data: record });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
