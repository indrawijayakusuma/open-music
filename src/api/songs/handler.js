/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
class SongHandler {
  constructor(service, validator) {
    this.service = service;
    this.validator = validator;
  }

  async postSongHandler(request, h) {
    this.validator.validateSongPayload(request.payload);
    const { title, year, genre, performer, duration, albumId } = request.payload;

    const id = await this.service.addSong({ title, year, genre, performer, duration, albumId });

    const response = h.response({
      status: 'success',
      data: {
        songId: id,
      },
    });
    response.code(201);
    return response;
  }

  async getSongHandler(request) {
    const { title, performer } = request.query;
    const songs = await this.service.getSong(title, performer);

    return {
      status: 'success',
      data: {
        songs,
      },
    };
  }

  async getSongByIdHandler(request) {
    const { id } = request.params;

    const song = await this.service.getSongById(id);

    return {
      status: 'success',
      data: {
          song,
      },
    };
  }

  async putSongByIdHandler(request) {
    this.validator.validateSongPayload(request.payload);
    const { id } = request.params;
    await this.service.editSong(id, request.payload);

    return {
      status: 'success',
      message: 'song berhasil diperbarui',
    };
  }

  async deleteSongByIdHandler(request) {
    const { id } = request.params;

    await this.service.deleteSongById(id);

    return {
      status: 'success',
      message: 'song berhasil di hapus',
    };
  }
}

module.exports = SongHandler;
