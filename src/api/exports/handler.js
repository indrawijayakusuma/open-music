class exportHandler {
    constructor(service, validator) {
        this.service = service;
        this.validator = validator;
    }

    async postExportPlaylistHandler(request, h) {
        this.validator.validateExportPayload(request.payload);
        const { playlistId } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this.service.verifyPlaylistOwner(playlistId, credentialId);
        const message = {
            playlistId,
            targetEmail: request.payload.targetEmail,
        };
        await this.service.sendMessage('export:playlists', JSON.stringify(message));
        const response = h.response({
            status: 'success',
            message: 'Permintaan Anda sedang kami proses',
        });
        response.code(201);
    }
}

module.exports = exportHandler;
