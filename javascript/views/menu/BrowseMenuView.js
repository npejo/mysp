/**
 *
 */
(function(app) {
    'use strict';

    var MenuView = function(options) {
        app.Views.CoreView.call(this, options);
    };

    MenuView.prototype = Object.create(app.Views.CoreView.prototype);

    MenuView.prototype.addEventListeners = function() {
        this.delegate('#mymp-menu-search-btn', 'click', doSearch());

        function doSearch() {
            var query = document.getElementById('mymp-menu-search').value;
            if (query !== '') {
                this.goTo({page: 'search', q: query});
            }
        }
    };

    MenuView.prototype.getTemplate = function() {
        return '<div>' +
            '<input type="text" id="mymp-menu-search" value=""/>' +
            '<button id="mymp-menu-search-btn">Search</button>' +
            '</div>';
    };

    app.Views.MenuView = MenuView;
})(MYMP);
