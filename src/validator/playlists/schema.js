const Joi = require('joi');

const playlistPayloadSchema = Joi.object({
    name: Joi.string().required(),
});

const postPlaylistSongSchema = Joi.object({
    songId: Joi.string().required(),
});

module.exports = { playlistPayloadSchema, postPlaylistSongSchema };
