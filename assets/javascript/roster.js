$(function() {
  const $roster = $("#roster");
  const $list = $("<ul>").addClass("list-group");

  // return html for student name and delete button
  const createListItem = name => `
    <li class="list-group-item">
      <div
        class="d-flex w-100 align-items-center justify-content-between"
      >
        <p class="h5">${name}</p>
        <div>
          <button class="btn btn-sm mb-0 btn-outline-danger delete-student" data-name=${name}>
            <i class="fas fa-user-times btn-sm"></i>
          </button>
        </div>
      </div>
    </li>
  `;

  // renders list of students to the DOM
  const renderStudentList = () => {
    $list.empty().append(
      ...students
        .names()
        .sort()
        .map(createListItem)
    );
    $roster.empty().append(`<p>Count: ${students.names().length}</p>`, $list);
  };

  // Adds student name to store or display alert if an error occurs
  const tryToAddStudent = name => {
    try {
      students.addStudent(name);
    } catch (error) {
      window.alert(`${name} not added.\n${error.message}`);
    }
  };

  // Get user input and add new students
  const handleFormSubmit = e => {
    e.preventDefault();
    const $addStudentInput = $("#add-students");
    const newNames = $addStudentInput
      .val()
      .trim()
      .split(",")
      .map(name => name.trim());

    newNames.forEach(name => name && tryToAddStudent(name));
    renderStudentList();
    $addStudentInput.val("");
  };

  const initAddStudentsForm = () => {
    $("#add-students-form").on("submit", handleFormSubmit);
  };

  const handleStudentDelete = function() {
    const name = $(this).data("name");
    students.removeStudent(name);
    renderStudentList();
  };

  initAddStudentsForm();
  renderStudentList();
  $("body").on("click", ".delete-student", handleStudentDelete);
});
