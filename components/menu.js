import { locationHandler } from "../helpers/location-handler.js";

export const menu = {
    navItemSelector: ".nav-item",
    activeClass: "active",
    makeItemActive: function(currentItem) {
        $(currentItem).addClass(this.activeClass);
    },
    clearActiveItem: function() {
        $(this.navItemSelector).removeClass(this.activeClass);
    }
};

$(menu.navItemSelector).on("click", function(event) {
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    locationHandler();
});
