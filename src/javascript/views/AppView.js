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
        this.user = options.user;
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
        return '<header class="row">' +
                '<div class="col-1-3"><a href="#page=search" class="mysp-title"><h1>MY<br/>SP</h1></a></div>' +
                '<div class="col-1-3 text-center" id="mysp-info-box"></div>' +
                '<div class="col-1-3 text-right">' +
                    '<div class="row">' +
                        'Welcome <strong class="mysp-logged-user-name">'
                        + this.user.getName() + '</strong>,&nbsp; <a href="#" id="btn-logout">Logout</a>' +
                    '</div>' +
                    '<div class="row">' +
                        '<a href="#page=queue">Playing Queue</a>' +
                    '</div>' +
                '</div>' +
            '</header>' +
            '<div class="row">' +
                '<div id="mysp-menu" class="col-1-3">Here should be the menu</div>' +
                '<div id="mysp-content" class="col-2-3">this is content <h2>h2 123</h2></div>' +
                '' +
            '</div>';
    };
    
    app.Views.AppView = AppView;
})(MYSP);
