const Sequelize = require("sequelize");

module.exports = sequelize.define("transaction",{
	  id:{
       type: Sequelize.INTEGER,
       allowNull: false,
       autoIncrement: true,
       primaryKey:true,
    },
  	amount: Sequelize.INTEGER,
  	description: Sequelize.STRING,
})

//sequelize migration:create --name create_users_table
