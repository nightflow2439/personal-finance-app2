import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getRecordsByMonth } from "@/lib/actions";
import ModeSelector from "@/ui/mode_selector";
import Records from "@/ui/records";


export default async function Page({searchParams}) {
  const resolvedSearchParams = await searchParams;

  if (resolvedSearchParams.month) {
    const month = resolvedSearchParams.month;
    const records = await getRecordsByMonth(month);
    return (
      <>
        <h1>{month}</h1>
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
        <Link key={month} href={`/monthmode?month=${month}`}>{month}</Link>
      ))}
    </>
  )
}