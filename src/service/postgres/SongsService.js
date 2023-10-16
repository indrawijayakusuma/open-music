/* eslint-disable no-else-return */
/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapSongDBToModel } = require('../../utils');

class SongsService {
    constructor() {
        this.pool = new Pool();
    }

    async addSong({ title, year, genre, performer, duration, albumId }) {
        const id = nanoid(16);

        const query = {
            text: 'INSERT INTO song VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
            values: [id, title, year, performer, genre, duration, albumId],
        };

        const result = await this.pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('song gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getSong(title, performer) {
        const result = await this.pool.query('SELECT id, title, performer FROM song');
        const data = [];

        if (performer !== undefined && title !== undefined) {
            result.rows.forEach((res) => {
                if (res.title.toLowerCase().includes(title.toLowerCase()) && res.performer.toLowerCase().includes(performer.toLowerCase())) {
                    data.push(res);
                }
            });
            return data;
        } else if (performer !== undefined) {
            result.rows.forEach((res) => {
                if (res.performer.toLowerCase().includes(performer.toLowerCase())) {
                    data.push(res);
                }
            });
            return data;
        } else if (title !== undefined) {
            result.rows.forEach((res) => {
                if (res.title.toLowerCase().includes(title.toLowerCase())) {
                    data.push(res);
                }
            });
            return data;
        }

        return result.rows;
    }

    async getSongById(id) {
        const query = {
            text: 'SELECT * FROM song WHERE id = $1',
            values: [id],
        };

        const result = await this.pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('song tidak ditemukan');
        }
        return result.rows.map(mapSongDBToModel)[0];
    }

    async editSong(id, { title, year, performer, genre, duration, albumId }) {
        const query = {
            text: 'UPDATE song set title = $1, year = $2, performer = $3, genre = $4, duration = $5, album_id = $6 WHERE id = $7 RETURNING id',
            values: [title, year, performer, genre, duration, albumId, id],
        };

        const result = await this.pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui song. Id tidak ditemukan');
        }
    }

    async deleteSongById(id) {
        const query = {
            text: 'DELETE FROM song WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this.pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('song gagal dihapus. Id tidak ditemukan');
        }
    }

    async getSongByAlbumId(albumId) {
        const query = {
            text: 'SELECT id, title, performer FROM song WHERE album_id = $1',
            values: [albumId],
        };
        const result = await this.pool.query(query);

        return result.rows;
    }
}
module.exports = SongsService;
