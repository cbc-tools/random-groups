const createStudents = ({ getStudents, setStudents }) => {
  const students = getStudents();

  const names = () => [...students];

  const addStudent = newName => {
    if (!newName || newName.length < 1) {
      throw new Error("Name must have at least one character.");
    }
    if (students.includes(newName)) {
      throw new Error("Name must be unique.");
    }
    students.push(newName);
    setStudents(students);
  };

  const removeStudent = nameToRemove => {
    const indexToRemove = students.indexOf(nameToRemove);
    if (indexToRemove === -1) {
      throw new Error("Student not found.");
    }
    students.splice(indexToRemove, 1);
    setStudents(students);
  };

  return { names, addStudent, removeStudent };
};

const students = createStudents({
  getStudents: () => JSON.parse(localStorage.getItem("students")) || [],
  setStudents: students =>
    localStorage.setItem("students", JSON.stringify(students || []))
});
