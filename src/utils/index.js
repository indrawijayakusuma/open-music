/* eslint-disable camelcase */
const mapDBAlbumToModel = ({
    id,
    name,
    year,
}) => ({
    id,
    name,
    year,
});

const playlistSongDBToModel = ({
    song_id,
    title,
    performer,
}) => ({
    id: song_id,
    title,
    performer,
});

const mapSongDBToModel = ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    album_id,
}) => ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    albumId: album_id,
});
module.exports = { mapDBAlbumToModel, mapSongDBToModel, playlistSongDBToModel };
