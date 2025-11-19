import { selectMode } from "@/lib/actions"

export default function ModeSelector() {
  return (
    <>
      <form action={selectMode}>
        <input type="submit" name="mode" value="收支总览" />
        <input type="submit" name="mode" value="按日查看" />
        <input type="submit" name="mode" value="按月查看" />
      </form>
    </>
  )
}