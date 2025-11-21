import { prisma } from "@/lib/prisma";
import { deleteRecord, editRecord, handleCategory } from "@/lib/actions";
import ModeSelector from "@/ui/mode_selector";

export default async function Overview() {
  const records = await prisma.record.findMany();

  return (
    <>
      <h1>收支总览</h1>
      <ModeSelector />
      {records.map((record) =>
        <div key={record.id}>
          <p>
            {record.date.toString().slice(0, 24)}-{record.amount}元-{record.type}-
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
          <form action={handleCategory}>
            <input type="hidden" name="id" value={record.id} />
            <input type="submit" value="添加/编辑类别" />
          </form>
        </div>
      )}
    </>
  );
}
