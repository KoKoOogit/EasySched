var form = FormApp.openByUrl("https://docs.google.com/forms/d/1eQmXBU32YwBBO8JCKNEq6tlMidfDUlQ67f-O8RjauBE/edit");

function myFunction() {
  clearForm();
  // addClass("02", "sample class 2", 1, 28, "test teacher 1");
  // validateMySpreadsheet('C2:C42');
  // openMessageBox("test");
  var finalRow = SpreadsheetApp.getActive().getRange("I5");
  // parseData(finalRow);
  addQuestionsToForm();
}

function clearForm(){
  var items = form.getItems();
  while(items.length > 0){
    form.deleteItem(items.pop());
  }
}

function openMessageBox(message) {
  Browser.msgBox(message);
}

function addClass(courseID, className, period, numStudents, teacher) {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([courseID, className, String(period), String(numStudents), teacher]);
}

function validateMySpreadsheet(range) {
  // test code
  var cell = SpreadsheetApp.getActive().getRange(range);
  var rule = SpreadsheetApp.newDataValidation()
     .requireNumberBetween(1, 6)
     .setAllowInvalid(false)
     .setHelpText('Number must be between 1 and 6.')
     .build();
  cell.setDataValidation(rule);
}

function createNewSheet(newSheetName) {
  // WILL DELETE A SHEET IF IT ALREADY EXISTS
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var yourNewSheet = activeSpreadsheet.getSheetByName(newSheetName);

  if (yourNewSheet != null) {
    activeSpreadsheet.deleteSheet(yourNewSheet);
  }

  yourNewSheet = activeSpreadsheet.insertSheet();
  yourNewSheet.setName(newSheetName);
}

function parseData(finalRow) {
  var classData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Class Data");
  Logger.log("parsing data from: " + classData.getName());

  getDataFromClassData(finalRow);
}
// Course ID	Course Name	Periods	# of Students	Teacher
function getDataFromClassData(finalRow) {
  var tempList = new Array(new Array);
  var classData = SpreadsheetApp.getActive().getSheetByName("Class Data");
  Logger.log(classData.getDataRange().getA1Notation());
  var dataSheetArray = classData.getRange(classData.getDataRange().getA1Notation()).getDisplayValues();
  dataSheetArray.splice(0,1);
  Logger.log(dataSheetArray);
  for (r = 0; r < dataSheetArray.length; r++) {
    addRowToDataSheet(dataSheetArray[r]);
  }
  Logger.log(tempList.toString());
}

function addRowToDataSheet(values) {
  // will be the data from class data
  var dataSheet = SpreadsheetApp.getActive().getSheetByName("dataSheet");
  Logger.log("adding class data to new row of dataSheet");
  var courseID = values[0];
  var className = values[1];
  var period = values[2];
  var numStudents = values[3];
  var teacherName = values[4];

  dataSheet.appendRow([courseID, className, period, String(36-parseInt(numStudents)), className, teacherName, "test spot", "test spot"]);
}






function addQuestionsToForm() {
  // to use the parsed data from the dataSheet to create a new google form with the specified questions
  // to be used for the actual schedule questions

  var dataSheet = SpreadsheetApp.getActive().getSheetByName("dataSheet");
  var dataSheetArray = dataSheet.getDataRange().getDisplayValues();
  Logger.log(dataSheetArray);
  dataSheetArray = invertRowAndColumns(dataSheetArray).splice(1,3);
  dataSheetArray.splice(1,1);
  dataSheetArray.forEach(x => x.splice(0,1));
  Logger.log(dataSheetArray);
  // courseID	classID	period	available_seats	name	teacher	priority	prerequisites <- original data from the sheet
  // inverting the rows and columns will make it so each index of the outer array will be the options for the questions

    // INDEX OF CLASSES WILL BE: <replace value>
    var indexOfClasses = 0;

    var periodA = form.addListItem();
    periodA.setTitle('Select your A Period class')
        .setChoices(
          removeDuplicates(dataSheetArray[indexOfClasses])
          .map(x => periodA.createChoice(x)));

    var period1 = form.addListItem();
    period1.setTitle('Select your 1st Period class')
        .setChoices(
          removeDuplicates(dataSheetArray[indexOfClasses])
          .map(x => period1.createChoice(x)));

    var period2 = form.addListItem();
    period2.setTitle('Select your 2nd Period class')
        .setChoices(
          removeDuplicates(dataSheetArray[indexOfClasses])
          .map(x => period2.createChoice(x)));

    var period3 = form.addListItem();
    period3.setTitle('Select your 3rd Period class')
        .setChoices(
          removeDuplicates(dataSheetArray[indexOfClasses])
          .map(x => period3.createChoice(x)));

    var period4 = form.addListItem();
    period4.setTitle('Select your 4th Period class')
        .setChoices(
          removeDuplicates(dataSheetArray[indexOfClasses])
          .map(x => period4.createChoice(x)));

    var period5 = form.addListItem();
    period5.setTitle('Select your 5th Period class')
        .setChoices(
          removeDuplicates(dataSheetArray[indexOfClasses])
          .map(x => period5.createChoice(x)));

    var period6 = form.addListItem();
    period6.setTitle('Select your 6th Period class')
        .setChoices(
          removeDuplicates(dataSheetArray[indexOfClasses])
          .map(x => period6.createChoice(x)));

    var periodB = form.addListItem();
    periodB.setTitle('Select your B Period class')
        .setChoices(
          removeDuplicates(dataSheetArray[indexOfClasses])
          .map(x => periodB.createChoice(x)));
}

function invertRowAndColumns(array) {
  if (array == undefined) { return undefined; }
  var tempArray = new Array(new Array);
  var column = new Array;
  for (c = 0; c < array[0].length; c++) {
    for (r = 0; r < array.length; r++) {
      column.push(array[r][c]);
    }
    tempArray.push(column);
    column = new Array;
  }
  return tempArray;
}

function removeDuplicates(arr) { return arr.filter((item, index) => arr.indexOf(item) === index); }

