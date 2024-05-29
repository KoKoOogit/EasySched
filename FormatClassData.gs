var form;

function createForm() {
  form = FormApp.openByUrl(getUserFormLink());
  clearForm();
  addQuestionsToForm();

  // addClass("02", "sample class 2", 1, 28, "test teacher 1");
  // validateMySpreadsheet('C2:C42');
  // openMessageBox("test");
  // parseData();
  openMessageBox("Complete! Please open the form and it should have all information needed.");
}

function formatData() {
  parseData();
}

function getUserFormLink() {
  const ui = SpreadsheetApp.getUi();
  let result = ui.prompt("Please enter the link to a new google form, we will be using this to get the actual requests.");

  let button = result.getSelectedButton();
  
  if (button === ui.Button.OK) {
    Logger.log("The user clicked the [OK] button.");
    Logger.log(result.getResponseText());
    return result.getResponseText();
  } else if (button === ui.Button.CLOSE) {
    Logger.log("The user clicked the [X] button and closed the prompt dialogue.");
    return null;
  }
}



function clearForm(){
  let items = form.getItems();
  while(items.length > 0){
    form.deleteItem(items.pop());
  }
}

function openMessageBox(message) {
  Browser.msgBox(message);
}

function addClass(courseID, className, period, numStudents, teacher) {
  let sheet = SpreadsheetApp.getActiveSheet();
  sheet.appendRow([courseID, className, String(period), String(numStudents), teacher]);
}

function validateMySpreadsheet(range) {
  // test code
  let cell = SpreadsheetApp.getActive().getRange(range);
  let rule = SpreadsheetApp.newDataValidation()
     .requireNumberBetween(1, 6)
     .setAllowInvalid(false)
     .setHelpText('Number must be between 1 and 6.')
     .build();
  cell.setDataValidation(rule);
}

function createNewSheet(newSheetName) {
  // WILL DELETE A SHEET IF IT ALREADY EXISTS
  let activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let yourNewSheet = activeSpreadsheet.getSheetByName(newSheetName);

  if (yourNewSheet != null) {
    activeSpreadsheet.deleteSheet(yourNewSheet);
  }

  yourNewSheet = activeSpreadsheet.insertSheet();
  yourNewSheet.setName(newSheetName);
}

function parseData() {
  Logger.log("parsing data from Class Data");

  getDataFromClassData();
}

// Course ID	Course Name	Periods	# of Students	Teacher
function getDataFromClassData() {
  let tempList = new Array(new Array);
  let classData = SpreadsheetApp.getActive().getSheetByName("Class Data");
  Logger.log(classData.getDataRange().getA1Notation());
  let dataSheetArray = classData.getRange(classData.getDataRange().getA1Notation()).getDisplayValues();
  dataSheetArray.splice(0,1);
  Logger.log(dataSheetArray);
  for (r = 0; r < dataSheetArray.length; r++) {
    addRowToDataSheet(dataSheetArray[r]);
  }
  Logger.log(tempList.toString());
}

function addRowToDataSheet(values) {
  // will be the data from class data
  let dataSheet = SpreadsheetApp.getActive().getSheetByName("dataSheet");
  Logger.log("adding class data to new row of dataSheet");
  let courseID = values[0];
  let className = values[1];
  let period = values[2];
  let numStudents = values[3];
  let teacherName = values[4];

  dataSheet.appendRow([courseID, className, period, String(36-parseInt(numStudents)), className, teacherName, "test spot", "test spot"]);
}






function addQuestionsToForm() {
  // to use the parsed data from the dataSheet to create a new google form with the specified questions
  // to be used for the actual schedule questions

  const dataSheet = SpreadsheetApp.getActive().getSheetByName("dataSheet");
  let dataSheetArray = dataSheet.getDataRange().getDisplayValues();
  Logger.log(dataSheetArray);
  dataSheetArray = invertRowAndColumns(dataSheetArray);
  dataSheetArray.splice(0,1);
  dataSheetArray.forEach(x => x.splice(0,1));
  Logger.log(dataSheetArray);
  // courseID	classID	period	available_seats	name	teacher	priority	prerequisites <- original data from the sheet
  // inverting the rows and columns will make it so each index of the outer array will be the options for the questions

  const studentLastName = form.addTextItem().setTitle("Enter your last name").setRequired(true);
  const studentFirstName = form.addTextItem().setTitle("Enter your first name").setRequired(true);
  const studentEmail = form.addTextItem().setTitle("Enter your school email").setRequired(true);
  const parentEmail = form.addTextItem().setTitle("Enter your parent's email").setRequired(true);



    // INDEX OF CLASSES WILL BE: <replace value>
    const indexOfClasses = 4;
    const indexOfCourseIDs = 0;
    const choicesArray = [...new Set(arrayAdd(dataSheetArray[indexOfClasses], dataSheetArray[indexOfCourseIDs]))];

    let periodA = form.addListItem();
    periodA.setTitle('Select your A Period class')
        .setChoices(
          choicesArray
          .map(x => periodA.createChoice(x)));

    let period1 = form.addListItem();
    period1.setTitle('Select your 1st Period class')
          .setChoices(
            choicesArray
            .map(x => period1.createChoice(x)));

    let period2 = form.addListItem();
    period2.setTitle('Select your 2nd Period class')
          .setChoices(
            choicesArray
            .map(x => period2.createChoice(x)));

    let period3 = form.addListItem();
    period3.setTitle('Select your 3rd Period class')
          .setChoices(
            choicesArray
            .map(x => period3.createChoice(x)));

    let period4 = form.addListItem();
    period4.setTitle('Select your 4th Period class')
          .setChoices(
            choicesArray
            .map(x => period4.createChoice(x)));

    let period5 = form.addListItem();
    period5.setTitle('Select your 5th Period class')
          .setChoices(
            choicesArray
            .map(x => period5.createChoice(x)));

    let period6 = form.addListItem();
    period6.setTitle('Select your 6th Period class')
          .setChoices(
            choicesArray
            .map(x => period6.createChoice(x)));

    let periodB = form.addListItem();
    periodB.setTitle('Select your B Period class')
          .setChoices(
            choicesArray
            .map(x => periodB.createChoice(x)));
    
    let requestedClass = form.addListItem();
    requestedClass.setTitle('Select which class you would like to request')
        .setChoices(
          choicesArray
          .map(x => requestedClass.createChoice(x)))
        .setRequired(true);

    let droppedClass = form.addListItem();
    droppedClass.setTitle('Select which class you would like to be replaced by the requested class')
        .setChoices(
          choicesArray
          .map(x => droppedClass.createChoice(x)))
        .setRequired(true);
}

function invertRowAndColumns(array) {
  if (array == undefined) { return undefined; }
  let tempArray = new Array(new Array);
  let column = new Array;
  for (let c = 0; c < array[0].length; c++) {
    for (let r = 0; r < array.length; r++) {
      column.push(array[r][c]);
    }
    Logger.log(column);
    tempArray.push(column);
    column = new Array;
  }
  return tempArray;
}

function removeDuplicates(arr) {
  return [...new Set(arr)];
}

function arrayAdd(first, second) {
  for (let i = 0; i < first.length; i++) {
    second[i] = String(first[i] + ' - Course ID: ' + second[i]);
  }
  return second;
}






function onFormSubmit(e) {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  let dataRange = sheet.getDataRange();
  let data = dataRange.getDisplayValues();
  
  // Start from the second row (index 1 in JavaScript)
  for (let i = 1; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] && data[i][j].includes('Course ID:')) {
        let parts = data[i][j].split(' - Course ID: ');
        if (parts.length == 2) { // Ensure split is successful
          let className = parts[0];
          let courseID = parts[1];
          data[i][j] = `${className} {${courseID}}`;
        }
      }
    }
  }
  
  // Write the updated data back to the sheet
  let range = sheet.getRange(2, 1, data.length - 1, data[0].length);
  range.setValues(data.slice(1));
}
