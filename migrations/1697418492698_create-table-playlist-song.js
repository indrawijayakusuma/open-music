/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('playlist_song', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
            notNull: true,
        },
        playlist_id: {
            type: 'VARCHAR(50)',
        },
        song_id: {
            type: 'VARCHAR(50)',
        },
    });

    pgm.addConstraint('playlist_song', 'fk_playlist_song.playlist_id_playlist.id', 'FOREIGN KEY(playlist_id) REFERENCES playlist(id) ON DELETE CASCADE');
    pgm.addConstraint('playlist_song', 'fk_playlist_song.song_id_song.id', 'FOREIGN KEY(song_id) REFERENCES song(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropTable('playlist_song');
};
