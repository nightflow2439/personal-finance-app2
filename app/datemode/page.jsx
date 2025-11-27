import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getRecordsByDate } from "@/lib/actions";
import Records from "@/ui/records";
import { aggregateAll } from "@/lib/aggregate";

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  
  if (resolvedSearchParams.date) {
    const date = resolvedSearchParams.date;
    const records = await getRecordsByDate(date);
    const {income, expense, total} = aggregateAll(records);
    return (
      <>
        <Records records={records} title={date} income={income} expense={expense} total={total} />
      </>
    )
  }

  const records = await prisma.record.findMany();
  const dateSet = new Set(records.map(record => record.date.toString().slice(0, 15)));
  const dateArray = Array.from(dateSet);

  return (
    <>
      <h1>按日查看</h1>
      {dateArray.map(date =>
        <div key={date}>
          <Link href={`/datemode?date=${date}`}>{date}</Link>
        </div>
      )}
    </>
  )
}