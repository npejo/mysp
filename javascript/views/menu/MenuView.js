/**
 *
 */
(function(app) {
    'use strict';

    var MenuView = function(options) {
        app.Views.CoreView.call(this, options);
    };

    MenuView.prototype = Object.create(app.Views.CoreView.prototype);

    MenuView.prototype.getTemplate = function() {
        return '<div id="mymp-menu-search" class="menu-section"></div>' +
            '<div id="mymp-menu-playlists" class="menu-section"></div>';
    };

    app.Views.MenuView = MenuView;
})(MYMP);
