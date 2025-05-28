let Utils = {
  generateID() {
    return crypto.randomUUID();
  },

  clearContainer(container) {
    container.innerHTML = "";
  },

  removeClass(className, element) {
    element.classList.remove(className);
  },
};

export default Utils;
