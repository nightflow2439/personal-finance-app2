import ChartView from "@/ui/chart_view";
import { prisma } from "@/lib/prisma";
import { aggregateByDate, aggregateByMonth } from "@/lib/aggregate";

export default async function Page() {
  const records = await prisma.record.findMany();
  const daily = aggregateByDate(records);
  const monthly = aggregateByMonth(records);
  return (
    <>
      <h1 className="section-title">按日收支记录</h1>
      <ChartView records={daily} type="date"/>
      <h1 className="section-title">按月收支记录</h1>
      <ChartView records={monthly} type="month"/>
    </>
  );
}
