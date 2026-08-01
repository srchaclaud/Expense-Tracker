function doGet() {
  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle("Expense Tracker");
}

function getExpenseSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName("Expenses");

  if (!sheet) {
    throw new Error("Expenses sheet not found.");
  }

  return sheet;
}
