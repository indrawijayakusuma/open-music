const rute = require('./routes');
const AlbumHandler = require('./handler');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, serviceSong, validator }) => {
    const albumHandler = new AlbumHandler(service, serviceSong, validator);
    server.route(rute(albumHandler));
  },
};
