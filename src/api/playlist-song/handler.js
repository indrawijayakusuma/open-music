class playlistSongHandler {
    constructor(service, playlistService, validator) {
        this.service = service;
        this.playlistService = playlistService;
        this.validator = validator;
    }

    async postSongToPlaylistHandler(request, h) {
        this.validator.validatePlaylistSongPayload(request.payload);
        const { id: idPlaylist } = request.params;
        const { songId } = request.payload;
        const { id: credentialId } = request.auth.credentials;

        await this.playlistService.verifyPlaylistOwner(idPlaylist, credentialId);

        await this.service.addSongToPlaylist(songId, idPlaylist);
        const response = h.response({
            status: 'success',
            message: 'lagu berhasil di tambahkan',
        });
        response.code(201);
        return response;
    }

    async getPlaylistSongHandler(request) {
        const { id } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this.playlistService.verifyPlaylistOwner(id, credentialId);
        const playlist = await this.service.getPlaylistSong({ id });

        return {
            status: 'success',
            data: {
                playlist,
            },
        };
    }

    async deletePlaylistSongHandler(request) {
        this.validator.validatePlaylistSongPayload(request.payload);
        const { id } = request.params;
        const { songId } = request.payload;
        const { id: credentialId } = request.auth.credentials;

        await this.playlistService.verifyPlaylistOwner(id, credentialId);
        await this.service.deletePlaylistSong({ songId, id });

        return {
            status: 'success',
            message: 'song berhasil di hapus',
        };
    }
}

module.exports = playlistSongHandler;
