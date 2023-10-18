const routes = require('./routes');
const PlaylistActivitiesHandler = require('./handler');

module.exports = {
    name: 'playlistActivities',
    version: '1.0.0',
    register: async (server, { service, playlistService }) => {
        const playlistActivitiesHandler = new PlaylistActivitiesHandler(service, playlistService);
        server.route(routes(playlistActivitiesHandler));
    },
};
