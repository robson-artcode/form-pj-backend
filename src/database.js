const { Sequelize } = require('sequelize');
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.MYSQLDB_DATABASE,
  'root',
  process.env.MYSQLDB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

module.exports = sequelize;
