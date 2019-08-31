
const Sequelize = require("sequelize")

const sequelize = new Sequelize('niffler', 'itzumarpa', 'abcd', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
