export const projectEl = {
  defaultProjects: document.querySelector("[data-project-list='default']"),
  userProjects: document.querySelector("[data-project-list='user']"),
};

export const taskAreaEl = {
  taskAreaContainer: document.querySelector(".main"),
};

export const projectFormEl = {
  input: document.querySelector("[data-input='project-title']"),
  submitBtn: document.querySelector("[data-btn='submit-project-form']"),
};

export const taskModalEl = {
  form: document.querySelector("[data-form='add-task']"),
  modal: document.querySelector("[data-modal='add-task']"),
  title: document.querySelector(".modal-title"),
  submitBtn: document.querySelector("[data-btn='submit-form']"),
  closeBtn: document.querySelector("[data-btn='modal-close']"),
};
