function getDashboardData() {
  const sheet = getExpenseSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return {
      total: 0,
      today: 0,
      count: 0,
      average: 0
    };
  }

  const data = sheet
    .getRange(2, 1, lastRow - 1, 5)
    .getValues();

  let total = 0;
  let todayTotal = 0;

  const today = new Date();

  data.forEach(row => {
    const amount = Number(row[3]) || 0;
    const date = row[4];

    total += amount;

    if (date instanceof Date) {
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        todayTotal += amount;
      }
    }
  });

  return {
    total: total,
    today: todayTotal,
    count: data.length,
    average: data.length > 0 ? total / data.length : 0
  };
}


function getCategoryData() {
  const sheet = getExpenseSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  const data = sheet
    .getRange(2, 1, lastRow - 1, 5)
    .getValues();

  const categories = {};

  data.forEach(row => {
    const category = row[2] || "Other";
    const amount = Number(row[3]) || 0;

    if (!categories[category]) {
      categories[category] = 0;
    }

    categories[category] += amount;
  });

  return Object.keys(categories).map(category => ({
    category: category,
    amount: categories[category]
  }));
}
