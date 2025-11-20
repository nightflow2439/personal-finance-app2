export default function Records({ records }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Amount</th>
          <th>Type</th>
          <th>Note</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record =>
          <tr key={record.id}>
            <td>{record.amount}</td>
            <td>{record.type}</td>
            <td>{record.note}</td>
            <td>{record.date.toString().slice(0, 24)}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}