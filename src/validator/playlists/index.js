const InvariantError = require('../../exceptions/InvariantError');
const playlistPayloadSchema = require('./schema');

const songValidator = {
    validatePlaylistPayload: (payload) => {
        const validationResult = playlistPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = songValidator;
