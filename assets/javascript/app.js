const groupsDisplay = $("#groups-display");
const sizeDisplay = $("#size-display");
let groupsNumber = 1;
let sizeNumber = 1;

$(".btn").click(function() {
  let buttonPressed = this.id;
  console.log(buttonPressed);
  switch (buttonPressed) {
    case "groups-up":
      if (groupsNumber < currentClass.students.length) ++groupsNumber;
      break;
    case "groups-down":
      if (groupsNumber > 1) --groupsNumber;
      break;
    case "groups-submit":
      displayGroups(currentClass.groupByGroups(groupsNumber));
      break;
    case "size-up":
      if (sizeNumber < currentClass.students.length) ++sizeNumber;
      break;
    case "size-down":
      if (sizeNumber > 1) --sizeNumber;
      break;
    case "size-submit":
      displayGroups(currentClass.groupBySize(sizeNumber));
      break;
  }
  groupsDisplay.text(groupsNumber);
  sizeDisplay.text(sizeNumber);
});

function displayGroups(groupsToDisplay) {
  for (let i = 0; i < 24; i++) {
    $("#group-card-" + i).empty();
  }
  for (let i = 0; i < groupsToDisplay.length; i++) {
    let newCardTarget = $("#group-card-" + i);
    let newCard = $("<div class='card'></div>");
    let newCardHeader = $(
      "<div class='card-header'>Group " + (i + 1) + "</div>"
    );
    let newCardUL = $("<ul class='list-group list-group-flush'>");
    for (let ii = 0; ii < groupsToDisplay[i].length; ii++) {
      if (groupsToDisplay[i][ii]) {
        let newCardLI = $(
          "<li class='list-group-item'>" +
            groupsToDisplay[i][ii].firstName +
            " " +
            groupsToDisplay[i][ii].lastName +
            "</li>"
        );
        newCardUL.append(newCardLI);
      }
    }
    newCard.append(newCardHeader);
    newCard.append(newCardUL);
    newCardTarget.append(newCard);
  }
}

function Student(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

function Classroom(className) {
  this.className = className;
  this.students = [];
  this.randomizedArray = [];
  this.randomFlag = true;
  this.addStudent = (firstName, lastName) =>
    this.students.push(new Student(firstName, lastName));
  this.randomize = groupSize => {
    if (this.randomFlag) {
      this.randomizedArray = [];
      this.randomFlag = false;
    }
    if (this.students.length >= 1) {
      this.randomizedArray = this.randomizedArray.concat(
        this.students.splice(Math.floor(Math.random() * this.students.length))
      );
      this.randomize();
    } else {
      this.students = this.randomizedArray;
      this.randomFlag = true;
    }
  };
  this.groupBySize = groupSize => {
    if (groupSize > this.students.length) {
      console.log("Not enough students!");
      return false;
    }
    this.randomize();
    let numberOfGroups = Math.ceil(this.students.length / groupSize);
    let groupsArray = new Array(numberOfGroups);
    for (let i = 0; i < groupsArray.length; i++) {
      groupsArray[i] = [];
    }
    for (let i = 0; i < numberOfGroups; i++) {
      for (let ii = 0; ii < groupSize; ii++) {
        groupsArray[i].push(this.students[ii + groupSize * i]);
      }
    }
    return groupsArray;
  };
  this.groupByGroups = numberOfGroups => {
    this.randomize();
    if (numberOfGroups > this.students.length) {
      console.log("Not enough students!");
      return false;
    }
    let groupSize = Math.ceil(this.students.length / numberOfGroups);
    let groupsArray = new Array(numberOfGroups);
    for (let i = 0; i < groupsArray.length; i++) {
      groupsArray[i] = [];
    }
    for (let i = 0; i < groupSize; i++) {
      for (let ii = 0; ii < numberOfGroups; ii++) {
        groupsArray[ii].push(this.students[ii + numberOfGroups * i]);
      }
    }
    return groupsArray;
  };
  this.printStudents = () => {
    console.log(this.students);
  };
}

const currentClass = new Classroom("CBC_2019");
students.names().forEach(name => currentClass.addStudent(name, ""));
