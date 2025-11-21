import { prisma } from "@/lib/prisma";
import { editCategory, addCategory, deleteCategory } from "@/lib/actions";

export default async function Page({params}) {
  const resolvedParams = await params;
  const id = parseInt(resolvedParams.id);
  const record = await prisma.record.findUnique({
    where: {
      id: id
    }
  });
  return (
    <>
      <h3>当前标签</h3>
      {record.categories?.map(cat => (
        <div key={cat}>
          <p>{cat}</p>
          <form action={editCategory}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="cat" value={cat} />
            <input type="text" name="newcat" autoComplete="off" required/>
            <input type="submit" value="编辑" />
          </form>
          <form action={deleteCategory}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="cat" value={cat} />
            <input type="submit" value="删除" />
          </form>
        </div>
      ))}
      <h3>添加标签</h3>
      <form action={addCategory}>
        <input type="hidden" name="id" value={id} />
        <input type="text" name="newcat" autoComplete="off" required/>
        <input type="submit" value="添加" />
      </form>
    </>
  )
}