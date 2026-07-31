function doGet() {
  return HtmlService.createTemplateFromFile("Index")
    .evaluate()
    .setTitle("Expense Tracker");
}

function include(file) {
  return HtmlService.createHtmlOutputFromFile(file).getContent();
}
