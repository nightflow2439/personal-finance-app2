import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getRecordsByMonth } from "@/lib/actions";
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
        <Records records={records} title={month} income={income} expense={expense} total={total} />
      </>
    )
  }

  const records = await prisma.record.findMany({
    orderBy:{
      date: 'desc'
    }
  });
  const monthSet = new Set(records.map(record => record.date.toString().slice(4, 7) + ' ' 
  + record.date.toString().slice(11, 15)));
  const monthArray = Array.from(monthSet);

  return (
    <>
      <h1 className="page-title">按月查看</h1>
      <div className="month-list">
        {monthArray.map(month => (
          <Link key={month} href={`/monthmode?month=${month}`} className="month-link">
            {month}
          </Link>
        ))}
      </div>
    </>
  );
}