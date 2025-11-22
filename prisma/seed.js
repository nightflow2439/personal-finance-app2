import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.record.deleteMany({});
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Record';`;

  const records = [
    { date: new Date(2025, 10, 1, 10, 0), amount: 100, type: "income", note: "Salary" },
    { date: new Date(2025, 10, 5, 15, 30), amount: 50, type: "expense", note: "Groceries" },
    { date: new Date(2025, 11, 1, 9, 0), amount: 120, type: "income", note: "Bonus" },
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
