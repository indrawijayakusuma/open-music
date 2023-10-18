/* eslint-disable max-len */
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

const mapDBPlaylistActivity = ({
    username, title, action, time,
}) => ({
    username,
    title,
    action,
    time,
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
module.exports = {
    mapDBAlbumToModel, mapSongDBToModel, playlistSongDBToModel, mapDBPlaylistActivity,
};
