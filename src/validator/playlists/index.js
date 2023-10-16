const InvariantError = require('../../exceptions/InvariantError');
const { playlistPayloadSchema, postPlaylistSongSchema } = require('./schema');

const songValidator = {
    validatePlaylistPayload: (payload) => {
        const validationResult = playlistPayloadSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },

    validatePlaylistSongPayload: (payload) => {
        const validationResult = postPlaylistSongSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = songValidator;
