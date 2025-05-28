import Utils from "../utils/utils";

export default function Model() {
  const DEFAULT_PROJECTS = [
    {
      id: "general",
      title: "General",
      tasks: [
        {
          id: "t1",
          title: "Set up your projects",
          detail: "Create your projects from the sidebar",
          isComplete: false,
          priority: "low",
          due: "28 Dec 2030",
        },
        {
          id: "t2",
          title: "Click on me to see the details",
          detail: "Your details will show here",
          isComplete: false,
          priority: "",
          due: "28 Dec 2030",
        },
      ],
    },
    {
      id: "completed",
      title: "Completed",
      tasks: [],
    },
  ];

  let data = {
    defaultProjects: DEFAULT_PROJECTS,
    userProjects: [
      {
        id: "p1",
        title: "Daily Tasks",
        tasks: [
          {
            id: "t3",
            title: "Brush your teeth",
            detail: "Remember to Floss Floss Floss",
            isComplete: false,
            priority: "",
            due: "28 Dec 2030",
          },
        ],
      },
    ],
  };

  let { defaultProjects, userProjects } = data;

  function getAllProjectList() {
    // Get a list of all projects
    // Custom and Default with id & title only
    let list = [];
    for (let projects of Object.values(data)) {
      for (let project of projects) {
        let id = project.id;
        let title = project.title;
        list.push({ id, title });
      }
    }

    return list;
  }

  function getUserProjects() {
    // Returns userProjects list as is
    return userProjects;
  }

  function getDefaultProjects() {
    // Returns defaultProjects list as is
    return defaultProjects;
  }

  function addProject(projectObj) {
    let project = {
      ...projectObj,
      id: Utils.generateID(),
      tasks: [],
    };

    userProjects.push(project);

    return project;
  }

  function getTasksFromProject(projectID) {
    // Gets tasks from a particular project
    if (["general", "completed"].includes(projectID)) {
      return defaultProjects.filter((project) => project.id === projectID)[0].tasks;
    }

    return userProjects.filter((project) => project.id === projectID)[0].tasks;
  }

  function getProjectTaskArray(id) {
    // Get the reference to the taskList from any project given it's id

    if (["general", "completed"].includes(id)) {
      return defaultProjects.filter((project) => project.id === id)[0].tasks;
    }

    return userProjects.filter((project) => project.id === id)[0].tasks;
  }

  function getProject(id) {
    // Get the task project using ID
    if (["general", "completed"].includes(id)) {
      return defaultProjects.filter((project) => project.id === id)[0];
    }

    return userProjects.filter((project) => project.id === id)[0];
  }

  function removeProject(id) {
    if (["general", "completed"].includes(id)) return;

    userProjects = userProjects.filter((project) => project.id !== id);
  }

  function addTask(projectID, taskObj) {
    let newTask = {
      ...taskObj,
      id: Utils.generateID(),
      isComplete: false,
    };

    const project = getProjectTaskArray(projectID); // Get reference
    project.push(newTask);
  }

  function completeTask(projectID, taskID) {
    let project = getProject(projectID);

    // Get the completedTask
    let completedTask = project.tasks.filter((task) => task.id === taskID)[0];

    // Remove it from currentProjectList
    project.tasks = project.tasks.filter((task) => task.id !== taskID);

    // Get reference to completedTaskProject
    let completedTasksProject = getProject("completed");

    // Push the completed tasks to completedTasks array
    completedTasksProject.tasks.push({ ...completedTask, isComplete: true });
  }

  function updateTask(projectID, taskID, updatedTaskObj) {
    let project = getProject(projectID);
    project.tasks = project.tasks.map((task) => {
      if (task.id !== taskID) return task;
      else return { ...task, ...updatedTaskObj };
    });
  }

  function removeTask(projectID, taskID) {
    let project = getProject(projectID);
    project.tasks = project.tasks.filter((task) => task.id !== taskID);
  }

  return {
    getAllProjectList,
    getUserProjects,
    getDefaultProjects,
    addProject,
    removeProject,
    getTasksFromProject,
    getProjectTaskArray,
    addTask,
    completeTask,
    updateTask,
    removeTask,
    getProject,
  };
}
