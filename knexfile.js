// Update with your config settings.
const pgConnection = process.env.DATABASE_URL || 'postgres://nysikcxrgrqysp:7695a129f813be3500a9b04a90c6c24ea29e0f7aa8cf59af492ca885f99f92f7@ec2-52-202-146-43.compute-1.amazonaws.com:5432/d4pssce313r18g'

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
      min: 2,
      max: 10
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  }

};
