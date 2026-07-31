function getSheet() {
  return SpreadsheetApp.openById(SHEET_ID).getSheetByName("Expenses");
}

// Add Expense
function addExpense(data) {

  let sheet = getSheet();

  sheet.appendRow([
    data.date,
    data.category,
    data.description,
    Number(data.amount),
    new Date()
  ]);

  return true;
}

// Get Expenses
function getExpenses() {

  const sheet = getSheet();

  const data = sheet.getDataRange().getDisplayValues();

  data.shift(); // Remove header row

  Logger.log(data);

  return data.reverse();
}
// Delete Expense
function deleteExpense(row){

  let sheet = getSheet();

  let last = sheet.getLastRow();

  let actualRow = last - row;

  sheet.deleteRow(actualRow);

  return true;
}
