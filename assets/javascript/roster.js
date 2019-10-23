$(function() {
  const $roster = $("#roster");
  const $list = $("<ul>").addClass("list-group");

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

  const renderStudentList = () => {
    $list.empty().append(...students.names().sort().map(createListItem));
    $roster.empty().append(`<p>Count: ${students.names().length}</p>`, $list);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    const newNames = $("#add-students")
      .val()
      .trim()
      .split(",")
      .map(name => name.trim());

    newNames.forEach(name => name && students.addStudent(name));
    renderStudentList();
  };

  const initForm = () => {
    $("#add-students-form").on("submit", handleFormSubmit);
  };

  const handleStudentDelete = function() {
    const name = $(this).data("name");
    students.removeStudent(name);
    renderStudentList();
  };

  initForm();
  renderStudentList();
  $("body").on("click", ".delete-student", handleStudentDelete);
});
