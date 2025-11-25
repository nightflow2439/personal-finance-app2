import ChartView from "@/ui/chart_view";
import { prisma } from "@/lib/prisma";
import { aggregateByDate, aggregateByMonth } from "@/lib/aggregate";

export default async function Page() {
  const records = await prisma.record.findMany();
  const daily = aggregateByDate(records);
  const monthly = aggregateByMonth(records);
  return (
    <>
      <ChartView records={daily} type="date"/>
      <ChartView records={monthly} type="month"/>
    </>
  );
}
