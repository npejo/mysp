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
        document.getElementById('mymp-menu-search-btn')
            .addEventListener('click', function() {
                var query = document.getElementById('mymp-menu-search').value;
                if (query !== '') {
                    window.location.hash = app.Utils.objToQuerystring({
                        page: 'search',
                        q: query
                    });
                }
            }, false);
    };

    MenuView.prototype.getTemplate = function() {
        return '<div>' +
            '<input type="text" id="mymp-menu-search" value=""/>' +
            '<button id="mymp-menu-search-btn">Search</button>' +
            '</div>';
    };

    app.Views.MenuView = MenuView;
})(MYMP);
