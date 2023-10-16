const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBAlbumToModel } = require('../../utils');

class AlbumsService {
    constructor() {
        this.pool = new Pool();
    }

    async addAlbum({ name, year }) {
        const id = nanoid(16);

        const query = {
            text: 'INSERT INTO album VALUES($1, $2, $3) RETURNING id',
            values: [id, name, year],
        };

        const result = await this.pool.query(query);

        if (!result.rows[0].id) {
            throw new InvariantError('Album gagal ditambahkan');
        }

        return result.rows[0].id;
    }

    async getAlbumById(id) {
        const query = {
            text: 'SELECT * FROM album WHERE id = $1',
            values: [id],
        };

        const result = await this.pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('album tidak ditemukan');
        }
        return result.rows.map(mapDBAlbumToModel)[0];
    }

    async editAlbum(id, { name, year }) {
        const query = {
            text: 'UPDATE album set name = $1, year = $2 WHERE id = $3 RETURNING id',
            values: [name, year, id],
        };

        const result = await this.pool.query(query);
        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
        }
    }

    async deleteById(id) {
        const query = {
            text: 'DELETE FROM album WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this.pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
        }
    }
}
module.exports = AlbumsService;
