class AlbumHandler {
  constructor(service, serviceSong, validator) {
    this.service = service;
    this.validator = validator;
    this.serviceSong = serviceSong;
  }

  async postAlbumHandler(request, h) {
    this.validator.validateAlbumPayload(request.payload);
    const { name, year } = request.payload;

    const id = await this.service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      data: {
        albumId: id,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;

    const album = await this.service.getAlbumById(id);
    const songs = await this.serviceSong.getSongByAlbumId(id);

    return {
      status: 'success',
      data: {
          album: {
            ...album,
            songs,
          },
        },
    };
  }

  async putAlbumByIdHandler(request) {
    this.validator.validateAlbumPayload(request.payload);
    const { id } = request.params;

    await this.service.editAlbum(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
  }

  async deleteAlbumByIdHandler(request) {
    const { id } = request.params;

    await this.service.deleteById(id);

    return {
      status: 'success',
      message: 'Album berhasil di hapus',
    };
  }
}

module.exports = AlbumHandler;
