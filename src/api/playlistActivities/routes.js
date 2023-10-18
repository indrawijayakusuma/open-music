const routes = (handler) => [
    {
        method: 'GET',
        path: '/playlists/{id}/activities',
        handler: (request, h) => handler.getPlaylistActivities(request, h),
        options: {
            auth: 'playlistapp_jwt',
        },
    },
];

module.exports = routes;
