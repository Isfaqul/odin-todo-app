import View from "./View";
import Model from "./Model";

export default function Controller() {
  const model = Model();
  const view = View();
  let currentTabID;

  function init() {
    view.renderProjects(model.getAllProjectList());
    view.renderTaskArea(model.getProject("general"));
    view.renderTasks(model.getTasksFromProject("general"));
    currentTabID = "general";
  }

  init();

  // Listen for tabChange event
  document.addEventListener("tabChange", handleTabChange);
  // Handle the TabChange
  function handleTabChange(e) {
    currentTabID = e.detail; // Update CurrentTabID;

    view.renderTaskArea(model.getProject(e.detail));
    view.renderTasks(model.getTasksFromProject(e.detail));
  }

  // Listen for projecAddition event
  document.addEventListener("projectAdd", handleProjectAddition);

  function handleProjectAddition(e) {
    const newProject = model.addProject(e.detail);
    view.renderProjects(model.getAllProjectList());

    // // Render latest project
    // view.renderTaskArea(model.getProject(newProject.id));
    // view.renderTasks(model.getTasksFromProject(newProject.id));
  }

  // Listen for AddTaskBtn Click
  document.addEventListener("addTaskClick", handleAddTaskClick);

  function handleAddTaskClick(e) {
    view.showModal();
  }

  // Listen for TaskFormSubmit

  document.addEventListener("taskFormSubmit", handleTaskAddition);

  function handleTaskAddition(e) {
    model.addTask(currentTabID, e.detail);

    view.renderTasks(model.getTasksFromProject(currentTabID));
  }
}
