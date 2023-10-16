const routes = require('./routes');
const PlaylistSongHandler = require('./handler');

module.exports = {
    name: 'playlistSongs',
    version: '1.0.0',
    register: async (server, { service, playlistService, validator }) => {
        const playlistSongHandler = new PlaylistSongHandler(service, playlistService, validator);
        server.route(routes(playlistSongHandler));
    },
};
