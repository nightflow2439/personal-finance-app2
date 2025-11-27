'use client'

async function downloadCSV() {
  const res = await fetch("/api/records");
  const records = await res.json();

  const header = ["date", "type", "amount", "note", "categories"];
  const rows = records.map(r => {
    const local = new Date(r.date);
    const localDate = local.toLocaleString();
    return [
      localDate,
      r.type,
      r.amount,
      (r.note ?? "").replace(/,/g, " "),
      JSON.stringify(r.categories ?? null)
    ];
  });

  const csv = [header.join(","), ...rows.map(r => r.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "records.csv";
  a.click();

  URL.revokeObjectURL(url);
}

export default function Page() {
  return (
    <button onClick={downloadCSV}>导出 CSV</button>
  );
}
