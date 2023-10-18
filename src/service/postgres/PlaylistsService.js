const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class PlaylistsService {
    constructor(collaborationService) {
        this.pool = new Pool();
        this.collaborationService = collaborationService;
    }

    async addPlaylist({ name, owner }) {
        const id = nanoid(16);
        const query = {
            text: 'INSERT INTO playlist VALUES($1, $2, $3) RETURNING id',
            values: [id, name, owner],
        };
        const result = await this.pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('gagal menambahkan playlist');
        }

        return result.rows[0].id;
    }

    async getPlaylist(owner) {
        const query = {
            text: `
            SELECT playlist.id, playlist.name, users.username
            FROM playlist 
            LEFT JOIN collaborations ON playlist.id = collaborations.playlist_id
            LEFT JOIN users ON playlist.owner = users.id
            WHERE playlist.owner = $1 or collaborations.user_id = $1`,
            values: [owner],
        };
        const result = await this.pool.query(query);
        return result.rows;
    }

    async deletePlaylist(id) {
        const query = {
            text: 'DELETE FROM playlist WHERE id = $1 RETURNING id',
            values: [id],
        };

        const result = await this.pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('id tidak ditemukan');
        }
    }

    async verifyPlaylistOwner(id, owner) {
        const query = {
            text: 'SELECT * FROM playlist WHERE id = $1',
            values: [id],
        };

        const result = await this.pool.query(query);

        if (!result.rowCount) {
            throw new NotFoundError('playlist tidak ditemukan');
        }

        const notesOwner = result.rows[0].owner;

        if (notesOwner !== owner) {
            throw new AuthorizationError('anda tidak berhak mengakses berkas ini');
        }
    }

    async verifyPlaylistAccess(playlistId, userId) {
        try {
            await this.verifyPlaylistOwner(playlistId, userId);
        } catch (error) {
            if (error instanceof NotFoundError) {
                throw error;
            }
            try {
                await this.collaborationService.verifyCollaborator(playlistId, userId);
            } catch {
                throw error;
            }
        }
    }
}

module.exports = PlaylistsService;
