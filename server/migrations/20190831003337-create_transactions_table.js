'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("transactions",{
     id:{
       type: Sequelize.INTEGER,
       allowNull: false,
       autoIncrement: true,
       primaryKey:true,
    },
    amount: Sequelize.INTEGER,
    description: Sequelize.STRING,
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    userId: Sequelize.STRING
    })
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.dropTable("transactions")
  }
};
