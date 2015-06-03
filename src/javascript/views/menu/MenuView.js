(function(app) {
    'use strict';

    /**
     * Handles the rendering of the main menu
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var MenuView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);
    };

    // chain the prototype of the parent object
    MenuView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Return the main layout of the main menu as string
     *
     * @returns {string}
     */
    MenuView.prototype.getTemplate = function() {
        return '<div id="mymp-menu-search" class="menu-section"></div>' +
            '<div id="mymp-menu-playlists" class="menu-section"></div>';
    };

    app.Views.MenuView = MenuView;
})(MYMP);
