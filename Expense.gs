function getExpenses() {
  const sheet = getExpenseSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    return [];
  }

  const data = sheet
    .getRange(2, 1, lastRow - 1, 5)
    .getValues();

  return data.map(row => ({
    id: row[0],
    description: row[1],
    category: row[2],
    amount: Number(row[3]) || 0,
    date: formatDate(row[4])
  })).reverse();
}



function addExpense(description, category, amount, date) {

  if (!description || !category || !amount || !date) {
    throw new Error("Please complete all fields.");
  }

  amount = Number(amount);

  if (isNaN(amount) || amount <= 0) {
    throw new Error("Please enter a valid amount.");
  }

  const sheet = getExpenseSheet();

  const id = "EXP-" + new Date().getTime();

  const expenseDate = new Date(date);

  sheet.appendRow([
    id,
    description,
    category,
    amount,
    expenseDate
  ]);

  return {
    success: true,
    message: "Expense added successfully!"
  };
}


function deleteExpense(id) {

  const sheet = getExpenseSheet();
  const lastRow = sheet.getLastRow();

  if (lastRow < 2) {
    throw new Error("No expenses found.");
  }

  const ids = sheet
    .getRange(2, 1, lastRow - 1, 1)
    .getValues();

  for (let i = 0; i < ids.length; i++) {

    if (String(ids[i][0]) === String(id)) {

      sheet.deleteRow(i + 2);

      return {
        success: true,
        message: "Expense deleted successfully!"
      };
    }
  }

  throw new Error("Expense not found.");
}


function formatDate(date) {

  if (!date) {
    return "";
  }

  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return Utilities.formatDate(
    date,
    Session.getScriptTimeZone(),
    "MMM dd, yyyy"
  );
}
