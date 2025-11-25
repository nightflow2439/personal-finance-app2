"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

export default function ChartView({ records, type }) {
  return (
    <LineChart width={600} height={300} data={records}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={type} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="income" stroke="#4CAF50" name="收入" />
      <Line type="monotone" dataKey="expense" stroke="#F44336" name="支出" />
      <Line type="monotone" dataKey="total" stroke="#2196F3" name="总计" />
    </LineChart>
  );
}