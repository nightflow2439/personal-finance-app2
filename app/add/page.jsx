import { addRecord } from "@/lib/actions";

export default function Add() {
  return (
    <>
      <form action={addRecord}>
        <label htmlFor="amount">金额</label>
        <input id="amount" name="amount" type="number" required />
        <br />
        <label htmlFor="income">收入</label>
        <input id="income" name="type" type="radio" value="income" required />
        <label htmlFor="expense">支出</label>
        <input id="expense" name="type" type="radio" value="expense" />
        <br />
        <label htmlFor="note">备注</label>
        <input id="note" name="note" type="text" />
        <br />
        <input type="submit" value="提交" />
      </form>
    </>
  );
}
