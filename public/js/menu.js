import { addEventOnElement } from "./event.js";

export const menu = function (menuWrapper, callback) {
    const menuelemnt = menuWrapper.querySelector("[data-menu]");
    const  menuTogglers = menuWrapper.querySelectorAll( "[data-menu-toggler]");
    const  menuItems = menuWrapper.querySelectorAll("[data-menu-item]");
  
    addEventOnElement(menuTogglers, "click", () => {
      menuelemnt.classList.toggle("expanded");
    });
  
    addEventOnElement(menuItems, "click", function () {
      menuelemnt.classList.remove("expanded");
      if (callback) {
        callback(this.dataset.menuItem)
    };
    });
  };