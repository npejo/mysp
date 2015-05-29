(function(app) {
    'use strict';

    var Auth = new app.Entities.Auth(app.Config);
    var User = new app.Entities.User({}, Auth.getToken(), app.Utils.ajax);

    if (User.isLoggedIn()) {
        User.loadProfile(function(err) {
            if (err) {
                Auth.logout();
                return;
            }

            Auth.setId(User.getId());

            var hashStr = window.location.hash;
            var route = hashStr !== '' ? app.Utils.hashToObject(hashStr) : app.Config.defaultRoute;

            User.loadPlaylists(function(err) {
                if (err) {
                    console.log(err);
                    console.log('problem while loading playlists');
                    return;
                }
                var appView = new app.Views.AppView({
                    element: 'mymp-container',
                    auth: Auth,
                    subViews: {
                        menu: getMenuView(route),
                        content: getContentView(route)
                    }
                });
                appView.render();
            });
        });
    } else {
        Auth.addLoginCallbackListener();

        var loginView = new app.Views.LoginView({
            element: 'mymp-container',
            auth: Auth
        });
        loginView.render();
    }



    function getMenuView(route) {
        return new app.Views.MenuView({
            element: 'mymp-menu',
            route: route,
            subViews: {
                //'browseMenu': new app.Views.BrowseMenuView({element: 'mymp-menu-browse'}),
                playlistsMenu: new app.Views.PlaylistsMenuView({
                    element: 'mymp-menu-playlists',
                    playlists: User.getPlaylists()
                })
                //'queueMenu': new app.Views.QueueMenuView({element: 'mymp-menu-queue'})
            }
        });
    }

    function getContentView(route) {
        console.log(route);
        return new app.Views.ContentView({
            element: 'mymp-content',
            route: route,
            subViews: {
                search: new app.Views.SearchPageView({
                    element: 'mymp-content',
                    route: route
                }),
                playlist: new app.Views.PlaylistPageView({
                    element: 'mymp-content',
                    route: route
                })
            }
        });
    }
})(MYMP);