/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('playlist', {
        id: {
            type: 'VARCHAR(50)',
            primaryKey: true,
            notNull: true,
        },
        name: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        owner: {
            type: 'VARCHAR(50)',
        },
    });

    pgm.addConstraint('playlist', 'fk_playlist.owner_users.id', 'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE');
};

exports.down = (pgm) => {
    pgm.dropTable('playlist');
};
