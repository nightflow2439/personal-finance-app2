import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.record.deleteMany({});
  await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name='Record';`;

  const records = [
    { date: new Date(2025, 10, 1, 10, 0), amount: 100, type: "income", note: "Salary" },
    { date: new Date(2025, 10, 5, 15, 30), amount: 50, type: "expense", note: "Groceries" },
    { date: new Date(2025, 10, 20, 20, 0), amount: 30, type: "expense", note: "Transport" },
    { date: new Date(2025, 11, 1, 9, 0), amount: 120, type: "income", note: "Bonus" },
    { date: new Date(2025, 11, 15, 18, 0), amount: 60, type: "expense", note: "Dining" },
    { date: new Date(2025, 11, 25, 12, 0), amount: 40, type: "expense", note: "Shopping" },
    { date: new Date(2026, 0, 3, 14, 0), amount: 200, type: "income", note: "Salary" },
    { date: new Date(2026, 0, 10, 19, 0), amount: 80, type: "expense", note: "Gift" },
    { date: new Date(2026, 0, 22, 11, 0), amount: 35, type: "expense", note: "Coffee" },
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
