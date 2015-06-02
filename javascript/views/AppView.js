(function(app) {
    'use strict';

    /**
     * The main application container view
     * Renders the basic layout of the application sections
     *
     * @extends CoreView
     * @param options
     * @constructor
     */
    var AppView = function(options) {
        // invoke the constructor of the parent object
        app.Views.CoreView.call(this, options);

        // injected dependencies
        this.auth = options.auth;
    };

    // chain the prototype of the parent object
    AppView.prototype = Object.create(app.Views.CoreView.prototype);

    /**
     * Bind event actions on elements within the view
     */
    AppView.prototype.addEventListeners = function() {
        var self = this;
        // bind click event to the logout button
        this.addListener('#btn-logout', 'click', function() {
            self.auth.logout();
        });
    };

    /**
     * Return the application layout template as string
     *
     * @returns {string}
     */
    AppView.prototype.getTemplate = function() {
        return '<div id="mymp-menu">Here should be the menu</div>' +
            '<div id="mymp-content">this is content <h2>h2 123</h2></div>' +
            '<button id="btn-logout">Logout</button>';
    };
    
    app.Views.AppView = AppView;
})(MYMP);
