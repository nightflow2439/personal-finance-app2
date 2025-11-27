import { addRecord } from "@/lib/actions";

export default function Add() {
  return (
    <form action={addRecord} className="container">
      
      <div className="form-group">
        <label htmlFor="amount" className="label">金额</label>
        <input id="amount" name="amount" type="number" autoComplete="off" required />
      </div>

      <div className="form-group">
        <span className="label">类型</span>
        <div className="radio-row">
          <label>
            <input name="type" type="radio" value="income" defaultChecked />
            <span className="radio-label">收入</span>
          </label>

          <label>
            <input name="type" type="radio" value="expense" />
            <span className="radio-label">支出</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="note" className="label">备注</label>
        <input id="note" name="note" type="text" placeholder="可选" autoComplete="off" />
      </div>

      <div className="form-group">
        <label htmlFor="categories" className="label">标签</label>
        <input id="categories" name="categories" type="text" placeholder="可选" autoComplete="off" />
      </div>

      <input type="submit" value="提交" />
    </form>
  );
}
