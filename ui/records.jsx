'use client'
import { useState } from "react";
import { selectMode, editRecord, deleteRecord } from "@/lib/actions"
import ReactMarkdown from "react-markdown";

export default function Records({ records, title, income, expense, total }) {
  const [aiResult, setAiResult] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleAIAnalyze() {
    setLoading(true);
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ records }),
      });
      const data = await res.json();
      setAiResult(data.result);
    } catch (err) {
      setAiResult("AI分析失败，请稍后重试。");
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <h1 className="page-title">{title}</h1>
      <div className="sub-title">
        <span>总收入：{income}</span>
        <span>总支出：{expense}</span>
        <span>净收入：{total}</span>
      </div>

      <div className="mode-selector">
        <form action={selectMode}>
          <input type="submit" name="mode" value="收支总览" />
          <input type="submit" name="mode" value="按日查看" />
          <input type="submit" name="mode" value="按月查看" />
        </form>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>日期</th>
              <th>时间</th>
              <th>种类</th>
              <th>数额</th>
              <th>备注</th>
              <th>标签</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {records.map(r => (
              <tr key={r.id}>
                <td>{r.date.toISOString().split("T")[0]}</td>
                <td>{r.date.toString().slice(16, 24)}</td>
                <td>{r.type == "income" ? "收入" : "支出"}</td>
                <td>{r.amount}</td>
                <td>{r.note}</td>
                <td>{r.categories?.join(" ")}</td>
                <td>
                  <form action={editRecord}>
                    <input type="hidden" name="id" value={r.id} />
                    <button className="edit" name="id" value={r.id}>编辑</button>
                  </form>
                  <form action={deleteRecord}>
                    <input type="hidden" name="id" value={r.id} />
                    <button className="delete">删除</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ai-analysis">
        <button onClick={handleAIAnalyze} disabled={loading}>
          {loading ? "分析中..." : "AI分析"}
        </button>
        {aiResult && (
          <div className="ai-result">
            <h3>AI分析结果：</h3>
            <ReactMarkdown>{aiResult}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  )
}