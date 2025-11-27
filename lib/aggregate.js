export function aggregateByDate(records) {
  const map = {};
  for (const r of records) {
    const date = r.date.toISOString().slice(0, 10);
    if (!map[date]) {
      map[date] = {
        date: date,
        income: 0,
        expense: 0,
        total: 0,
      };
    }
    if (r.type === "income") {
      map[date].income += r.amount;
    } else {
      map[date].expense += r.amount;
    }
    map[date].total = map[date].income - map[date].expense;
  }
  return Object.values(map).sort((a, b) => a.date.localeCompare(b.date));
}

export function aggregateByMonth(records) {
  const map = {};
  for (const r of records) {
    const month = r.date.toISOString().slice(0, 7);
    if (!map[month]) {
      map[month] = {
        month: month,
        income: 0,
        expense: 0,
        total: 0,
      };
    }
    if (r.type === "income") {
      map[month].income += r.amount;
    } else {
      map[month].expense += r.amount;
    }
    map[month].total = map[month].income - map[month].expense;
  }
  return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
}

export function aggregateAll(records) {
  let income = 0;
  let expense = 0;
  for (const r of records) {
    if (r.type === "income") {
      income += r.amount;
    } else {
      expense += r.amount;
    }
  }
  return {
    income,
    expense,
    total: income - expense,
  };
}