import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { records } = await req.json();

    // 将 records 转成简明文本
    const recordText = records.map(r => {
      const date = new Date(r.date).toISOString().split("T")[0];
      const type = r.type === "income" ? "收入" : "支出";
      const amount = r.amount;
      const note = r.note || "";
      const categories = r.categories?.join(", ") || "";
      return `${date} | ${type} | ${amount} | ${note} | ${categories}`;
    }).join("\n");

    // 调用通义千问接口
    const response = await fetch(process.env.QWEN_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.QWEN_API_KEY}`,
      },
      body: JSON.stringify({
        model: "qwen-turbo",
        messages: [
          { role: "system", content: "你是一个财务助理，分析用户收支记录并生成总结、支出提醒或建议。" },
          { role: "user", content: `请分析以下收支记录：\n${recordText}` }
        ],
        temperature: 0.7
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("通义千问返回错误:", errText);
      return NextResponse.json({ result: "AI分析失败，请稍后重试。" }, { status: 500 });
    }

    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || "未返回分析结果";
    return NextResponse.json({ result });
  } catch (err) {
    console.error("调用通义千问出错:", err);
    return NextResponse.json({ result: "AI分析失败，请稍后重试。" }, { status: 500 });
  }
}
