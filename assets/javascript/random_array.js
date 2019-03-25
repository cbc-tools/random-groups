function Student(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

function Classroom(className) {
    this.className = className;
    this.students = [];
    this.randomizedArray = [];
    this.randomFlag = true;
    this.addStudent = (firstName, lastName) => this.students.push(new Student(firstName, lastName));
    this.randomize = groupSize => {
        if (this.randomFlag) {
            this.randomizedArray = [];
            this.randomFlag = false;
        }
        if (this.students.length >= 1) {
            this.randomizedArray = this.randomizedArray.concat(this.students.splice(Math.floor(Math.random() * this.students.length)));
            this.randomize()
        } else {
            this.students = this.randomizedArray;
            this.randomFlag = true;
        }
    }
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
                groupsArray[i].push(this.students[ii + (groupSize * i)]);
            }
        }
        return groupsArray;
    }
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
                groupsArray[ii].push(this.students[ii + (numberOfGroups * i)]);
            }
        }
        return groupsArray;
    }
    this.printStudents = () => {
        console.log(this.students);
    }
}

let cbcClass = new Classroom("CBC_2019");
cbcClass.addStudent("1Matt", "Elliott");
cbcClass.addStudent("2Taylor", "Elliott");
cbcClass.addStudent("3Joey", "Stockham");
cbcClass.addStudent("4James", "Covel");
cbcClass.addStudent("5Joe", "Pena");
cbcClass.addStudent("6Angellyne", "DePerio");
cbcClass.addStudent("7Joseph", "Stalin");
cbcClass.addStudent("8Marie", "Antoinette");
cbcClass.addStudent("9Jesse", "Suphan");

console.log(cbcClass.groupByGroups(5));
// cbcClass.randomize();
// cbcClass.printStudents();
