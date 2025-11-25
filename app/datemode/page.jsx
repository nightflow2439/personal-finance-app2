import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getRecordsByDate } from "@/lib/actions";
import ModeSelector from "@/ui/mode_selector";
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
        <h1>{date}</h1>
        <h3 style={{ whiteSpace: "pre" }}>
          总收入：{income}    总支出：{expense}    净收入：{total}
        </h3>
        <Link href="/datemode">Back</Link>
        <Records records={records} />
      </>
    )
  }

  const records = await prisma.record.findMany();
  const dateSet = new Set(records.map(record => record.date.toString().slice(0, 15)));
  const dateArray = Array.from(dateSet);

  return (
    <>
      <h1>按日查看</h1>
      <ModeSelector />
      {dateArray.map(date =>
        <div key={date}>
          <Link href={`/datemode?date=${date}`}>{date}</Link>
        </div>
      )}
    </>
  )
}