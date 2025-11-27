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

  const records = await prisma.record.findMany({
    orderBy:{
      date: 'desc'
    }
  });
  const dateSet = new Set(records.map(record => record.date.toISOString().split("T")[0]));
  const dateArray = Array.from(dateSet);

  return (
    <>
      <h1 className="page-title">按日查看</h1>
      <div className="date-list">
        {dateArray.map(date => (
          <Link key={date} href={`/datemode?date=${date}`} className="date-link">
            {date}
          </Link>
        ))}
      </div>
    </>
  );
}