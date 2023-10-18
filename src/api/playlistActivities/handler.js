class PlaylistActivitiesHandler {
    constructor(service, playlistService) {
        this.service = service;
        this.playlistService = playlistService;
    }

    async getPlaylistActivities(request) {
        const { id: playlistId } = request.params;
        const { id: credentialId } = request.auth.credentials;

        await this.playlistService.verifyPlaylistAccess(playlistId, credentialId);
        const playlistActivity = await this.service.getPlaylistActivity({ playlistId });

        return {
            status: 'success',
            data: {
                ...playlistActivity,
            },
        };
    }
}

module.exports = PlaylistActivitiesHandler;
