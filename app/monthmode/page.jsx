import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getRecordsByMonth } from "@/lib/actions";
import ModeSelector from "@/ui/mode_selector";
import Records from "@/ui/records";
import { aggregateAll } from "@/lib/aggregate";


export default async function Page({searchParams}) {
  const resolvedSearchParams = await searchParams;

  if (resolvedSearchParams.month) {
    const month = resolvedSearchParams.month;
    const records = await getRecordsByMonth(month);
    const {income, expense, total} = aggregateAll(records);
    return (
      <>
        <h1>{month}</h1>
        <h3 style={{ whiteSpace: "pre" }}>
          总收入：{income}    总支出：{expense}    净收入：{total}
        </h3>
        <Link href="/monthmode">Back</Link>
        <Records records={records} />
      </>
    )
  }

  const records = await prisma.record.findMany();
  const monthSet = new Set(records.map(record => record.date.toString().slice(4, 7) + ' ' 
  + record.date.toString().slice(11, 15)));
  const monthArray = Array.from(monthSet);

  return (
    <>
      <h1>按月查看</h1>
      <ModeSelector />
      {monthArray.map(month => (
        <div key={month}>
          <Link href={`/monthmode?month=${month}`}>{month}</Link>
        </div>
      ))}
    </>
  )
}