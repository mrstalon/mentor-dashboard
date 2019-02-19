const mongoose = require('mongoose');
const dbConfig = require('../db-config');

mongoose.Promise = global.Promise

class DBWorker {
  constructor() {
    this.dbUrl = process.env.DB_URL || dbConfig.url;

    mongoose
      .connect(
        this.dbUrl,
        {
          useNewUrlParser: true,
          useFindAndModify: false,
          useCreateIndex: true
        }
      )
      .then(() => console.log('Successfuly connected to database'))
      .catch((err) => console.error(err))
  }

  getMongooseConnection() {
    return mongoose.connection;
  }
}

const dbWorker = new DBWorker();

module.exports = dbWorker;