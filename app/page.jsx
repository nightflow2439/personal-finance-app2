import { prisma } from "@/lib/prisma";
import { deleteRecord, editRecord } from "@/lib/actions";
import ModeSelector from "@/ui/mode_selector";

export default async function Homepage() {
  const records = await prisma.record.findMany();

  return (
    <>
      <h1>Homepage</h1>
      <ModeSelector />
      {records.map((record) =>
        <div key={record.id}>
          <p>
            {record.id}-{record.date.toString()}-{record.amount}-{record.type}-
            {record.note}
          </p>
          <form action={editRecord}>
            <input type="hidden" name="id" value={record.id} />
            <input type="submit" value="编辑" />
          </form>
          <form action={deleteRecord}>
            <input type="hidden" name="id" value={record.id} />
            <input type="submit" value="删除" />
          </form>
        </div>
      )}
    </>
  );
}
