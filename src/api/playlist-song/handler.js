class playlistSongHandler {
    constructor(service, playlistService, playlistActiviesService, validator) {
        this.service = service;
        this.playlistService = playlistService;
        this.validator = validator;
        this.playlistActiviesService = playlistActiviesService;
    }

    async postSongToPlaylistHandler(request, h) {
        this.validator.validatePlaylistSongPayload(request.payload);
        const { id: idPlaylist } = request.params;
        const { songId } = request.payload;
        const { id: credentialId } = request.auth.credentials;

        await this.playlistService.verifyPlaylistAccess(idPlaylist, credentialId);
        await this.service.addSongToPlaylist(songId, idPlaylist);

        await this.playlistActiviesService.addPlaylistActivity(songId, idPlaylist, credentialId, 'add');
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

        await this.playlistService.verifyPlaylistAccess(id, credentialId);
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

        await this.playlistService.verifyPlaylistAccess(id, credentialId);
        await this.service.deletePlaylistSong({ songId, id });

        await this.playlistActiviesService.addPlaylistActivity(songId, id, credentialId, 'delete');
        return {
            status: 'success',
            message: 'song berhasil di hapus',
        };
    }
}

module.exports = playlistSongHandler;
