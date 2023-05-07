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
