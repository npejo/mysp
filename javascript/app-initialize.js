(function(app) {
    'use strict';

    var Auth = new app.Entities.Auth(app.Config);
    var User = null;
    app.Events = new app.Entities.EventsModel();

    if (Auth.getToken() === '') {
        Auth.addLoginCallbackListener();

        var loginView = new app.Views.LoginView({
            element: 'mymp-container',
            auth: Auth
        });
        loginView.render();
    } else {
        app.Utils.ajax.token = Auth.getToken();

        User = new app.Entities.User({}, app.Utils.ajax);
        User.loadProfile(function(err, usr) {
            if (err) {
                // TODO: show info message
                Auth.logout();
                return;
            }

            Auth.setId(usr.getId());

            var hashStr = window.location.hash;
            var route = hashStr !== '' ? app.Utils.hashToObject(hashStr) : app.Config.defaultRoute;

            usr.loadPlaylists(function(err) {
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
    }



    function getMenuView(route) {
        return new app.Views.MenuView({
            element: 'mymp-menu',
            route: route,
            events: app.Events,
            subViews: {
                //'browseMenu': new app.Views.BrowseMenuView({element: 'mymp-menu-browse'}),
                playlistsMenu: new app.Views.PlaylistsMenuView({
                    element: 'mymp-menu-playlists',
                    user: User,
                    events: app.Events,
                    playlistModel: new app.Entities.Playlist(app.Utils.ajax)
                })
                //'queueMenu': new app.Views.QueueMenuView({element: 'mymp-menu-queue'})
            }
        });
    }

    function getContentView(route) {
        return new app.Views.ContentView({
            element: 'mymp-content',
            route: route,
            events: app.Events,
            subViews: {
                search: new app.Views.SearchPageView({
                    element: 'mymp-content',
                    route: route
                }),
                playlist: getPlaylistPageView(route)
            }
        });
    }

    function getPlaylistPageView(route) {
        return new app.Views.PlaylistPageView({
            element: 'mymp-content',
            route: route,
            events: app.Events,
            user: User,
            playlistModel: new app.Entities.Playlist(app.Utils.ajax),
            subViews: {
                playlistDetails: new app.Views.PlaylistDetailsView({
                    element: 'playlist-details',
                    events: app.Events,
                    user: User
                }),
                playlistTracks: new app.Views.PlaylistTracksView({
                    element: 'playlist-tracks',
                    events: app.Events
                })
            }
        });
    }
})(MYMP);