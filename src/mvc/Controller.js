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
}
