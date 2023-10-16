const routes = (handler) => [
    {
        method: 'POST',
        path: '/playlists/{id}/songs',
        handler: (request, h) => handler.postSongToPlaylistHandler(request, h),
        options: {
            auth: 'playlistapp_jwt',
        },
    },
    {
        method: 'GET',
        path: '/playlists/{id}/songs',
        handler: (request, h) => handler.getPlaylistSongHandler(request, h),
        options: {
            auth: 'playlistapp_jwt',
        },
    },
    {
        method: 'DELETE',
        path: '/playlists/{id}/songs',
        handler: (request, h) => handler.deletePlaylistSongHandler(request, h),
        options: {
            auth: 'playlistapp_jwt',
        },
    },
];

module.exports = routes;
