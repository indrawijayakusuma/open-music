const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { playlistSongDBToModel } = require('../../utils');

class PlaylistSongsService {
    constructor(songService) {
        this.pool = new Pool();
        this.songService = songService;
    }

    async addSongToPlaylist(songId, playlistId) {
        await this.songService.getSongById(songId);

        const id = `playlist-${nanoid(16)}`;
        const query = {
            text: 'INSERT INTO playlist_song VALUES($1, $2, $3) RETURNING id',
            values: [id, playlistId, songId],
        };
        const result = await this.pool.query(query);

        if (!result.rowCount) {
            throw new InvariantError('data gagal ditambahkan');
        }
    }

    async getPlaylistSong({ id }) {
        const query = {
            text: `SELECT playlist.id, playlist.name, users.username, song.id as song_id, song.title, song.performer 
                FROM playlist_song 
                INNER JOIN song ON playlist_song.song_id = song.id 
                INNER JOIN playlist ON playlist_song.playlist_id = playlist.id 
                INNER JOIN users ON playlist.owner = users.id 
                WHERE playlist.id = $1`,
            values: [id],
        };

        const result = await this.pool.query(query);
        const { id: playlistId, name, username } = result.rows[0];

        if (!result.rowCount) {
            throw new NotFoundError('playlist tidak ditemukn');
        }

        const songs = result.rows.map(playlistSongDBToModel);

        return {
            id: playlistId,
            name,
            username,
            songs,
        };
    }

    async deletePlaylistSong({ songId, id }) {
        const query = {
            text: 'DELETE FROM playlist_song WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
            values: [id, songId],
        };

        const result = await this.pool.query(query);
        if (!result.rowCount) {
            throw new NotFoundError('gagal menghapus playlist id tidak ditemukan');
        }
    }
}

module.exports = PlaylistSongsService;
