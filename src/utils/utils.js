import { isToday, isPast, format } from "date-fns";

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

  isValidDate(date) {
    let d = new Date(date);
    if (isToday(d) || !isPast(d)) {
      return true;
    } else {
      return false;
    }
  },

  formatDate(date) {
    return format(date, "dd MMM, yy");
  },
};

export default Utils;
