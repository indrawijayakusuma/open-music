const ExportHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    register: async (server, { service, validator }) => {
        const exportHandler = new ExportHandler(service, validator);
        server.route(routes(exportHandler));
    },
};
