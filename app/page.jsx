import { prisma } from "@/lib/prisma";
import { deleteRecord, editRecord, handleCategory } from "@/lib/actions";
import { aggregateAll } from "@/lib/aggregate";
import ModeSelector from "@/ui/mode_selector";

export default async function Overview() {
  const records = await prisma.record.findMany();
  const {income, expense, total} = aggregateAll(records);

  return (
    <>
      <h1>收支总览</h1>
      <h3 style={{ whiteSpace: "pre" }}>
        总收入：{income}    总支出：{expense}    净收入：{total}
      </h3>
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
