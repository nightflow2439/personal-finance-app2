import { prisma } from "@/lib/prisma";
import { deleteRecord, editRecord, handleCategory } from "@/lib/actions";
import { aggregateAll } from "@/lib/aggregate";
import Records from "@/ui/records";

export default async function Overview() {
  const records = await prisma.record.findMany();
  const {income, expense, total} = aggregateAll(records);

  return (
    <>
      <Records records={records} title="收支总览" income={income} expense={expense} total={total} />
    </>
  );
}
