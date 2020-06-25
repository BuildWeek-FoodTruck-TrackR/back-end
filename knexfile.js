// Update with your config settings.
const pgConnection = process.env.DATABASE_URL || 'postgres://elatdqmrcqrdrj:a0f67e4ddeac4ab208cb1e299360edb67ec42935a587d556af9b78a383bf600d@ec2-3-216-129-140.compute-1.amazonaws.com:5432/d4tquc7cpfk2tf'

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './database/users.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  },

  production: {
    client: "pg",
    connection: pgConnection,
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }

};
