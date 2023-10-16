class PlaylistHandler {
    constructor(service, validator) {
        this.service = service;
        this.validator = validator;
    }

    async postPlaylistHandler(request, h) {
        this.validator.validatePlaylistPayload(request.payload);

        const { name } = request.payload;
        const { id: owner } = request.auth.credentials;

        const id = await this.service.addPlaylist({ name, owner });
        return h.response({
            status: 'success',
            data: {
                playlistId: id,
            },
        }).code(201);
    }

    async getPlaylistHandler(request, h) {
        const { id: owner } = request.auth.credentials;
        const playlists = await this.service.getPlaylist(owner);
        return {
            status: 'success',
            data: {
                playlists,
            },
        };
    }

    async deletePlaylistHandler(request, h) {
        const { id } = request.params;
        const { id: owner } = request.auth.credentials;

        await this.service.verifyPlaylistOwner(id, owner);
        await this.service.deletePlaylist(id);

        return {
            status: 'success',
            message: 'playlist berhasil di hapus',
        };
    }
}

module.exports = PlaylistHandler;
