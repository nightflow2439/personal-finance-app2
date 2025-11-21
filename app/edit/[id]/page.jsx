import { updateRecord } from "@/lib/actions";
import { prisma } from "@/lib/prisma";

export default async function Page({ params }) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const record = await prisma.record.findUnique({
    where: {
      id: id
    }
  });
  return (
    <>
      <form action={updateRecord}>
        <label htmlFor="amount">金额</label>
        <input id="amount" name="amount" type="number" defaultValue={record.amount} required />
        <br />
        <label htmlFor="income">收入</label>
        <input id="income" name="type" type="radio" value="income" defaultChecked={record.type == "income"} required />
        <label htmlFor="expense">支出</label>
        <input id="expense" name="type" type="radio" value="expense" defaultChecked={record.type == "expense"} />
        <br />
        <label htmlFor="note">备注</label>
        <input id="note" name="note" type="text" defaultValue={record.note} />
        <br />
        <input type="hidden" name="id" value={id} />
        <input type="submit" value="保存" />
      </form>
    </>
  )
}