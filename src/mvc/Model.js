import Utils from "../utils/utils";

export default function Model() {
  const DEFAULT_PROJECTS = [
    {
      id: "general",
      title: "General",
      tasks: [
        {
          id: "t1",
          title: "Call her",
          detail: "Ask about the eye situation",
          due: "2025-05-28",
          priority: "high",
          isComplete: false,
        },
        {
          id: "t2",
          title: "Make Noodles",
          detail: "Ask about the eye situation",
          due: "2025-05-29",
          priority: "",
          isComplete: false,
        },
      ],
    },
  ];

  let data = {
    defaultProjects: DEFAULT_PROJECTS,
    userProjects: [
      {
        id: "one",
        title: "One",
        tasks: [
          {
            id: "t2",
            title: "Complete Todo Project",
            detail: "",
            priority: "",
            due: "2025-05-28",
            isComplete: false,
          },
        ],
      },
      {
        id: "two",
        title: "Two",
        tasks: [],
      },
    ],
    completedTasks: [],
  };

  let { defaultProjects, userProjects, completedTasks } = data;

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
    if (projectID === "general") {
      return defaultProjects.filter((project) => project.id === "general")[0].tasks;
    }

    return userProjects.filter((project) => project.id === projectID)[0].tasks;
  }

  function getProjectTaskArray(id) {
    // Get the reference to the taskList from any project given it's id

    if (id === "general") {
      return defaultProjects.filter((project) => project.id === "general")[0].tasks;
    }

    return userProjects.filter((project) => project.id === id)[0].tasks;
  }

  function getProject(id) {
    // Get the task project using ID
    if (id === "general") {
      return defaultProjects.filter((project) => project.id === "general")[0];
    }

    return userProjects.filter((project) => project.id === id)[0];
  }

  function removeProject(id) {
    if (id === "general") return;

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
    project.tasks = project.tasks.map((task) => {
      if (task.id !== taskID) return task;
      else return { ...task, isComplete: true };
    });

    removeTask(projectID, taskID);
    console.log(data);
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
