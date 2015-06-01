(function(app) {
    'use strict';

    app.ViewsConfig.menu = getMenuView;
    app.ViewsConfig.content = getContentView;
    app.ViewsConfig.playlistPage = getPlaylistPageView;

    function getMenuView(route, User) {
        return new app.Views.MenuView({
            element: 'mymp-menu',
            route: route,
            events: app.Events,
            subViews: {
                browseMenu: new app.Views.SearchMenuView({
                    element: 'mymp-menu-search',
                    route: route,
                    events: app.Events
                }),
                playlistsMenu: new app.Views.PlaylistsMenuView({
                    element: 'mymp-menu-playlists',
                    user: User,
                    events: app.Events,
                    playlistModel: new app.Models.Playlist(app.Utils.ajax)
                })
            }
        });
    }

    function getContentView(route, User) {
        return new app.Views.ContentView({
            element: 'mymp-content',
            route: route,
            events: app.Events,
            subViews: {
                search: new app.Views.SearchPageView({
                    element: 'mymp-content',
                    route: route
                }),
                playlist: app.ViewsConfig.playlistPage(route, User)
            }
        });
    }

    function getPlaylistPageView(route, User) {
        return new app.Views.PlaylistPageView({
            element: 'mymp-content',
            route: route,
            events: app.Events,
            user: User,
            playlistModel: new app.Models.Playlist(app.Utils.ajax),
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