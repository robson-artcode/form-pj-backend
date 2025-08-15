const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wefit', 'root', 'senha_root_123', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
});

module.exports = sequelize;
