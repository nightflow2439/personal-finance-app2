import ModeSelector from "@/ui/mode_selector";
import { filterDate } from "@/lib/actions";

export default async function Page() {
  const records = await prisma.record.findMany();
  const dateSet = new Set(records.map(record => record.date.toString().slice(0, 15)));
  const dateArray = Array.from(dateSet);
  console.log(dateArray);
  return (
    <>
      <h1>按日查看</h1>
      <ModeSelector />
      <div>
        {dateArray.map(date =>
          <form key={date} action={filterDate}>
            <input type="submit" name="date" value={date} />
          </form>
        )}
      </div>
    </>
  )
}