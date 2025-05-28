import { projectEl, taskAreaEl } from "../utils/elements";
import Utils from "../utils/utils";

export default function View() {
  function renderProjects(projects) {
    // Clear containers
    Utils.clearContainer(projectEl.defaultProjects);
    Utils.clearContainer(projectEl.userProjects);

    projects.forEach((project) => {
      const projectItem = createProjectListItem(project);
      // If General Project append it to defaultProjects
      if (project.id === "general") {
        projectEl.defaultProjects.appendChild(projectItem);
      } else {
        // Else append it to userProjects
        projectEl.userProjects.appendChild(projectItem);
      }
    });
  }

  // Helper
  function createProjectListItem(project) {
    let li = document.createElement("li");
    if (project.id === "general") li.classList.add(...["project-item", "active"]);
    else li.classList.add("project-item");

    if (project.id === "general") {
      li.innerHTML = `
            <button type="button" id="${project.id}" class="btn btn-project-item" data-btn-project>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3334 10H13.3334L11.6667 12.5H8.33335L6.66669 10H1.66669M18.3334 10V15C18.3334 15.442 18.1578 15.866 17.8452 16.1785C17.5326 16.4911 17.1087 16.6667 16.6667 16.6667H3.33335C2.89133 16.6667 2.4674 16.4911 2.15484 16.1785C1.84228 15.866 1.66669 15.442 1.66669 15V10M18.3334 10L15.4584 4.25834C15.3204 3.98067 15.1077 3.74699 14.8441 3.58358C14.5806 3.42017 14.2768 3.33351 13.9667 3.33334H6.03335C5.72328 3.33351 5.41941 3.42017 5.15589 3.58358C4.89237 3.74699 4.67967 3.98067 4.54169 4.25834L1.66669 10"
                    stroke="#2c2c2c"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <span>${project.title}</span>
            </button>
        `;
    } else {
      li.innerHTML = `
            <button type="button" id="${project.id}" class="btn btn-project-item" data-btn-project>
                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.6 0.159999L9.96 16H8.328L10.968 0.159999H12.6ZM13.8 10.096V11.56H0.48V10.096H13.8ZM6.984 0.159999L4.344 16H2.712L5.352 0.159999H6.984ZM14.856 4.576V6.04H1.536V4.576H14.856Z"
                      fill="black"
                    />
                </svg>
                <span>${project.title}</span>
            </button>
        `;
    }

    return li;
  }

  function renderTasks(tasks) {
    const taskList = document.querySelector(".task-list");
    Utils.clearContainer(taskList);

    tasks.forEach((task) => {
      const taskItem = createTaskItem(task);
      taskList.appendChild(taskItem);
    });
  }

  // Helper
  function createTaskItem(task) {
    let li = document.createElement("li");
    li.classList.add("task-item");
    // Priority coloring
    if (task.priority) li.classList.add(`task-${task.priority}`);
    li.id = task.id;

    li.innerHTML = `
            <input type="checkbox" />
              <div class="task-content">
                <span class="task-title">${task.title}</span>
                <span class="task-details">${task.detail}</span>
                <span class="task-due">Due : ${task.due}</span>
              </div>
            <button class="btn btn-task-edit" data-btn="task-edit">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10 16.6667H17.5M13.75 2.91666C14.0815 2.58514 14.5312 2.3989 15 2.3989C15.2321 2.3989 15.462 2.44462 15.6765 2.53346C15.891 2.6223 16.0858 2.75251 16.25 2.91666C16.4142 3.08081 16.5444 3.27569 16.6332 3.49017C16.722 3.70464 16.7678 3.93452 16.7678 4.16666C16.7678 4.39881 16.722 4.62868 16.6332 4.84316C16.5444 5.05763 16.4142 5.25251 16.25 5.41666L5.83333 15.8333L2.5 16.6667L3.33333 13.3333L13.75 2.91666Z"
                    stroke="#757575"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </svg>
            </button>
    `;

    return li;
  }

  function renderTaskArea(project) {
    Utils.clearContainer(taskAreaEl.taskAreaContainer);

    const taskArea = document.createElement("div");
    taskArea.classList.add("task-area");

    taskArea.innerHTML = `
        <div class="task-area-project-title-row">
            <h2 class="task-area-project-title">${project.title}</h2>
            <button type="button" class="btn btn-primary-red" id="${project.id}" data-btn="add-task">+ Add task</button>
        </div>
        <ul class="task-list" data-container="task-list"></ul>
    `;

    taskAreaEl.taskAreaContainer.appendChild(taskArea);
  }

  // Listen for tabChange Clicks
  const sidebar = document.querySelector("aside");
  sidebar.addEventListener("click", handleTabChange);

  function handleTabChange(e) {
    const target = e.target.closest("[data-btn-project]");
    if (target) {
      // Handle Btn Styling
      removeActiveClassFromProjectListItems();
      addActiveClassOnProjectListItem(target);

      const event = new CustomEvent("tabChange", {
        detail: target.id,
      });

      document.dispatchEvent(event);
    }
  }

  function removeActiveClassFromProjectListItems() {
    console.log("working");
    const btns = document.querySelectorAll("[data-btn-project]");
    btns.forEach((btn) => Utils.removeClass("active", btn.parentElement));
  }

  function addActiveClassOnProjectListItem(item) {
    item.parentElement.classList.add("active");
  }

  return { renderProjects, renderTasks, renderTaskArea };
}
