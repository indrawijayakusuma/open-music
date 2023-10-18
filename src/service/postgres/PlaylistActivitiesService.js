const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const { mapDBPlaylistActivity } = require('../../utils');

class PlaylistActivitiesService {
    constructor() {
        this.pool = new Pool();
    }

    async addPlaylistActivity(songId, playlistId, userId, action) {
        const id = `history-${nanoid(16)}`;
        const time = new Date().toISOString();
        const query = {
            text: 'INSERT INTO playlist_song_activity VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, playlistId, songId, userId, action, time],
        };

        const result = await this.pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('history gagal ditambahkan');
        }
    }

    async getPlaylistActivity({ playlistId }) {
        const query = {
            text: `SELECT playlist.id as playlistId, users.username, song.title, playlist_song_activity.action, playlist_song_activity.time 
            FROM playlist_song_activity 
            LEFT JOIN playlist ON playlist_song_activity.playlist_id = playlist.id 
            LEFT JOIN users ON playlist.owner = users.id 
            LEFT JOIN song ON playlist_song_activity.song_id = song.id
            WHERE playlist_song_activity.playlist_id = $1`,
            values: [playlistId],
        };

        const results = await this.pool.query(query);

        const activities = results.rows.map(mapDBPlaylistActivity).sort((a, b) => {
            const da = new Date(a.time);
            const db = new Date(b.time);
            return da - db;
        });
        const idPlaylist = results.rows[0].playlistid;

        return {
            playlistId: idPlaylist,
            activities,
        };
    }
}

module.exports = PlaylistActivitiesService;
