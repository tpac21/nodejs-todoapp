const tasksDOM = document.querySelector(".tasks");
const formDOM = document.querySelector(".task-form");
const taskInputDOM = document.querySelector(".task-input");
const formAlertDOM = document.querySelector(".form-alert");

// /api/v1/tasks  get all tasks from
const showTasks = async () => {
  try {
    // access to API
    const { data: tasks } = await axios.get("/api/v1/tasks");

    // if there is no tasks
    if (tasks.length < 1) {
      tasksDOM.innerHTML = `<h5 class="empty-list">there is no tasks</h5>`;
      return;
    }

    // output tasks
    const allTasks = tasks
      .map((task) => {
        const { completed, _id, name } = task;
        return `<div class="single-task ${completed && "task-completed"}">
      <h5>
        <span><i class="far fa-check-circle"></i></span>${name}
      </h5>
      <div class="task-links">
        <!-- edit link-->
        <a href="edit.html?id=${_id}" class="edit-link">
          <i class="fas fa-edit"></i>
        </a>
        <!-- trash link -->
        <button type="button" class="delete-btn" data-id="${_id}">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>`;
      })
      .join("");

    tasksDOM.innerHTML = allTasks;
  } catch (err) {
    console.log(err);
  }
};
showTasks();

// create new tasks
formDOM.addEventListener("submit", async (event) => {
  event.preventDefault();
  const name = taskInputDOM.value;

  try {
    await axios.post("/api/v1/tasks", { name: name });
    showTasks();
    taskInputDOM.value = "";
    formAlertDOM.style.display = "block";
    formAlertDOM.textContent = " task added";
    formAlertDOM.classList.add("text-success");
  } catch (err) {
    console.log(err);
    formAlertDOM.style.display = "block";
    formAlertDOM.innerHTML = "Tasks must be less than 20 letters. Please try again.";
  }
  setTimeout(() => {
    formAlertDOM.style.display = "none";
    formAlertDOM.classList.remove("text-success");
  }, 3000);
});

// delete tasks
tasksDOM.addEventListener("click", async (event) => {
  const element = event.target;

  if (element.parentElement.classList.contains("delete-btn")) {
    const id = element.parentElement.dataset.id;

    try {
      await axios.delete(`/api/v1/tasks/${id}`);
      showTasks();
    } catch (err) {
      console.log(err);
    }
  }
});
