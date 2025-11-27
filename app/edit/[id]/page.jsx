import { updateRecord, editCategory, addCategory, deleteCategory } from "@/lib/actions";
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
    <div className="page-container">
      <h3 className="section-title">当前标签</h3>

      {record.categories?.map((cat, index) => (
        <div className="category-item" key={index}>
          <div className="category-name">{cat}</div>

          <div className="category-actions">
            <form action={editCategory}>
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="cat" value={cat} />
              <input type="text" name="newcat" autoComplete="off" required placeholder="新标签名" />
              <input type="submit" value="编辑" />
            </form>

            <form action={deleteCategory}>
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="cat" value={cat} />
              <input type="submit" value="删除" className="btn-danger" />
            </form>
          </div>
        </div>
      ))}

      <h3 className="section-title">添加标签</h3>

      <form className="add-category-form" action={addCategory}>
        <input type="hidden" name="id" value={id} />
        <input type="text" name="newcat" autoComplete="off" required placeholder="新标签" />
        <input type="submit" value="添加" />
      </form>
      <h2 className="section-title">编辑记录</h2>

      <form action={updateRecord}>
        <div className="form-group">
          <label className="label" htmlFor="amount">金额</label>
          <input id="amount" name="amount" type="number" defaultValue={record.amount} required />
        </div>

        <div className="form-group">
          <label className="label">类型</label>
          <div className="radio-row">
            <label>
              <input id="income" name="type" type="radio" value="income" defaultChecked={record.type === "income"} required />
              <span className="radio-label">收入</span>
            </label>
            <label>
              <input id="expense" name="type" type="radio" value="expense" defaultChecked={record.type === "expense"} />
              <span className="radio-label">支出</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="label" htmlFor="note">备注</label>
          <input id="note" name="note" type="text" defaultValue={record.note} autoComplete="off" />
        </div>

        <input type="hidden" name="id" value={id} />

        <input type="submit" value="保存" />
      </form>
    </div>
  )
}