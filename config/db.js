const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('authapi', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
