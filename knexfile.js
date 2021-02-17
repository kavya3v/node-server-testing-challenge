// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './data/dream.db3'
    },
  pool: { 
    afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done) 
  },
  migrations:{
      filename: './data/migrations'
    },
  seeds:{
      filename: './data/seeds'
    }
  },
  testing: {
    client: 'sqlite3',
    useNullAsDefault:true,
    connection: {
      filename: './data/test.db3'
    },
    pool: { 
      afterCreate: (conn, done) => conn.run('PRAGMA foreign_keys = ON', done)
    },
    migrations:{
      filename: './data/migrations'
    },
  seeds:{
      filename: './data/seeds'
    }
  }
};
