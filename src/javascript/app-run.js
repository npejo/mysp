(function(app) {
    'use strict';

    // create instance off application level objects
    var Auth = new app.Models.Auth(app.Config);
    var Queue = new app.Models.Queue(app.Config);
    var User = null;
    app.Events = new app.Models.Events();

    // add listener for hash route change
    window.addEventListener('hashchange', function(e) {
        var hashString = e.newURL.split('#')[1];
        var route = app.Utils.hashToObject(hashString);

        app.Events.publish('routeChange', route);
    });

    if (Auth.getToken() === '') { // no logged in user
        showLogin();
    } else { // already logged in user
        initAppForUser();
    }


    /**
     * Display login page and add listener for authentication callback
     * Init user session on successful authentication callback
     */
    function showLogin() {
        // add listener for the oauth authentication callback
        Auth.addLoginCallbackListener();

        // display login view
        (new app.Views.LoginView({element: 'mysp-container', auth: Auth })).render();
    }

    /**
     * Load user profile and playlists to initialize the application
     */
    function initAppForUser() {
        // the aјax service is adding the active auth token to each api request
        app.Utils.ajax.token = Auth.getToken();

        // create empty user model instance
        User = new app.Models.User(app.Utils.ajax);

        // load user profile
        User.loadProfile(function(err, usr) {
            // logout the user if there is problem while loading the profile
            if (err) {
                // TODO: show info message
                return Auth.logout();
            }

            // keep the username of logged user in session
            Auth.setId(usr.getId());

            // parse current hash route
            var hashStr = window.location.hash;
            var route = hashStr !== '' ? app.Utils.hashToObject(hashStr) : app.Config.defaultRoute;

            // load user's playlists
            usr.loadPlaylists(function(err) {
                if (err) {
                    console.log('problem while loading playlists');
                    return;
                }

                // initialize the main application container view and render it
                var appView = new app.Views.AppView({
                    element: 'mysp-container',
                    auth: Auth,
                    user: User,
                    subViews: {
                        menu: app.ViewsConfig.menu(route, User, Auth, Queue),
                        content: app.ViewsConfig.content(route, User, Auth, Queue),
                        logger: new app.Views.LoggerView({
                            element: 'mysp-info-box',
                            events: app.Events
                        }),
                        player: new app.Views.PlayerView({
                            element: 'mysp-player-container',
                            events: app.Events,
                            queueModel: Queue
                        })
                    }
                });
                appView.render();
            });
        });
    }
})(MYSP);