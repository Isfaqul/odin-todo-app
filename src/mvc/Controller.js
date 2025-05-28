import View from "./View";
import Model from "./Model";

export default function Controller() {
  const model = Model();
  const view = View();
  let currentTabID;
  let isEditing = false;
  let currentEditTaskID = null;

  function init() {
    view.renderProjectList(model.getAllProjectList());
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

    currentTabID = newProject.id;
    view.renderTaskArea(model.getProject(currentTabID));
    view.renderProjectList(model.getAllProjectList());

    // remove active classes from all other tabs
    view.removeActiveClassFromProjectListItems();
    // add active class to the newly created project tab
    let el = view.getElementWithId(currentTabID);
    view.addActiveClassOnProjectListItem(el);
  }

  // Listen for AddTaskBtn Click
  document.addEventListener("addTaskClick", handleAddTaskClick);

  function handleAddTaskClick(e) {
    view.showModal("new");
  }

  // Listen for TaskFormSubmit
  document.addEventListener("taskFormSubmit", handleTaskFormSubmit);

  function handleTaskFormSubmit(e) {
    if (!isEditing) {
      model.addTask(currentTabID, e.detail);
    } else {
      model.updateTask(currentTabID, currentEditTaskID, e.detail);

      // Reset state
      isEditing = false;
      currentEditTaskID = null;
    }

    view.renderTasks(model.getTasksFromProject(currentTabID));
  }

  // Listen For TaskRemoval
  document.addEventListener("taskRemove", handleTaskRemoval);

  function handleTaskRemoval(e) {
    model.removeTask(currentTabID, e.detail);
    view.renderTasks(model.getTasksFromProject(currentTabID));
  }

  // Listen for TaskEdit
  document.addEventListener("taskEdit", handleTaskEdit);

  function handleTaskEdit(e) {
    isEditing = true; // Turn on editing mode
    currentEditTaskID = e.detail; // Set the id of the task being edited

    // Fetch the task
    const task = model.getTasksFromProject(currentTabID).filter((task) => task.id === e.detail)[0];

    // Update view
    view.populateFormWithTask(task);
    view.showModal("edit");
  }

  // Listen for TaskCompleteChecked
  document.addEventListener("taskComplete", handleTaskCompletion);

  function handleTaskCompletion(e) {
    model.completeTask(currentTabID, e.detail);

    setTimeout(() => {
      view.renderTasks(model.getTasksFromProject(currentTabID));
    }, 200);
  }
}
