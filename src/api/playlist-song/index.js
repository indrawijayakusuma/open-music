/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
const routes = require('./routes');
const PlaylistSongHandler = require('./handler');

module.exports = {
    name: 'playlistSongs',
    version: '1.0.0',
    register: async (server, { service, playlistService, playlistActiviesService, validator }) => {
        const playlistSongHandler = new PlaylistSongHandler(service, playlistService, playlistActiviesService, validator);
        server.route(routes(playlistSongHandler));
    },
};
