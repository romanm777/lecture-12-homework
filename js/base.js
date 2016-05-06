// employers
var employers = [];
// program settings
var settings = {
  max_employee_cout: 10,
  max_average_salary: 10000
}

// add new employee form
var behindForm = document.getElementById('behind-form');
// settings form
var settingsForm = document.getElementById('settings');
// message form
var messageForm = document.getElementById('message');

// shows form
function addNew() {
  behindForm.style.display = 'block';
}

// confirm and hide form
function confirmAdd() {
  // creates a new employee
  var newEmployee = {};
  newEmployee.first_name = document.getElementById("first-name").value;
  newEmployee.last_name = document.getElementById("last-name").value;
  newEmployee.salary = parseInt(document.getElementById("salary").value);
  newEmployee.position = document.getElementById("position").value;

  // checks new employee
  switch (checkEmployee(newEmployee)) {
    case 0:
      // appends to the array
      employers.push(newEmployee);
      // redraw an employers list
      redrawList();

      // hides the form
      behindForm.style.display = 'none';

      break;
    case 1:
      // hides the form
      behindForm.style.display = 'none';
      duplicateMessage(newEmployee);
      break;
    case 2:
      // hides the form
      behindForm.style.display = 'none';
      bigAverageSalaryMessage(newEmployee);
      break;
    case 3:
      // hides the form
      behindForm.style.display = 'none';
      tooMuchEmployersMessage();
      break;
    default:
      ;
  }
}

function checkEmployee(employee) {
  if(!checkUnique(employee))
    return 1;

  if(!checkAverageSalary(employee))
    return 2;

  if(employers.length >= settings.max_employee_cout)
    return 3;

  return 0;
}

function checkUnique(employee) {
  for(var i = 0; i < employers.length; ++i) {
    var exist = employers[i];
    if(employee.first_name === exist.first_name && employee.last_name === exist.last_name)
        return false;
  }

  return true;
}

function checkAverageSalary(employee) {
  var totalExist = employers.reduce(function(total, current, index, arr) {
    return total + current.salary;
  }, 0);

  var totalSalary = totalExist + employee.salary;
  var averageSalary = totalSalary / (employers.length + 1);

  return averageSalary <= settings.max_average_salary;
}

function redrawList() {
  var list = document.getElementById("employeeList");

  var length = list.children.length; // debug

  // removes all list items
  for(var j = list.children.length - 1; j >= 0; --j) {
    var child = list.children[j];
    list.removeChild(list.children[j]);
  }

  length = list.children.length; // debug

  // fill list by new values
  for(var i = 0; i < employers.length; ++i) {
    var emp = employers[i];

    // creates a list item
    var listItem = document.createElement("LI");

    // creates text node
    var itemText = emp.first_name + " " + emp.last_name + " $" + emp.salary + " " + emp.position;
    var textNode = document.createTextNode(itemText);

    // appends a text node to the list item
    listItem.appendChild(textNode);

    // appends the list item to the list
    list.appendChild(listItem);
  }

  length = list.children.length; // debug
  console.log(length);
}

function duplicateMessage(employee) {
  var str = employee.first_name + " " + employee.last_name + " already works here!";
  showMessage(str);
}

function bigAverageSalaryMessage(employee) {
  var str = employee.first_name + " " + employee.last_name + "'s salary ($" +
  employee.salary + ") is too big for us!";
  showMessage(str);
}

function tooMuchEmployersMessage() {
  var str = "We already have " + settings.max_employee_cout + " employers!";
  showMessage(str);
}


/// Message processing

function showMessage(text) {
  // shows message popup
  messageForm.style.display = 'block';
  // shows message text
  document.getElementById("message-body").innerHTML = text;
}

function confirmMessage() {
  messageForm.style.display = 'none';
}

/// Settings processing

function showSettings() {
  // shows settings popup
  settingsForm.style.display = 'block';

  document.getElementById("max-count").defaultValue = settings.max_employee_cout;
  document.getElementById("max-average-salary").defaultValue = settings.max_average_salary;
}

function confirmSettings() {
  settings.max_employee_cout = parseInt(document.getElementById("max-count").value);
  settings.max_average_salary = parseInt(document.getElementById("max-average-salary").value);
  settingsForm.style.display = 'none';
}
