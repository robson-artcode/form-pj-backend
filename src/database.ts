import { Sequelize } from 'sequelize';
import 'dotenv/config';

const sequelize = new Sequelize(
  process.env.MYSQLDB_DATABASE as string,
  'root',
  process.env.MYSQLDB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
  }
);

export default sequelize;