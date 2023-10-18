/* eslint-disable max-len */
class CollaborationsHandler {
    constructor(collaborationService, playlistService, validator) {
        this.collaborationsService = collaborationService;
        this.playlistService = playlistService;
        this.validator = validator;
    }

    async postCollaborationHandler(request, h) {
        this.validator.validateCollaborationPayload(request.payload);
        const { id: credentialId } = request.auth.credentials;
        const { playlistId, userId } = request.payload;
        await this.playlistService.verifyPlaylistOwner(playlistId, credentialId);
        const collaborationId = await this.collaborationsService.addCollaboration(playlistId, userId);
        const response = h.response({
            status: 'success',
            message: 'Kolaborasi berhasil ditambahkan',
            data: {
                collaborationId,
            },
        });
        response.code(201);
        return response;
    }

    async deleteCollaborationHandler(request, h) {
        this.validator.validateCollaborationPayload(request.payload);
        const { id: credentialId } = request.auth.credentials;
        const { playlistId, userId } = request.payload;

        await this.playlistService.verifyPlaylistOwner(playlistId, credentialId);
        await this.collaborationsService.deleteCollaboration(playlistId, userId);

        return {
            status: 'success',
            message: 'Kolaborasi berhasil dihapus',
        };
    }
}

module.exports = CollaborationsHandler;
