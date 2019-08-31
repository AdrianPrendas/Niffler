const Sequelize = require("sequelize");

module.exports = sequelize.define("user",{
	name: Sequelize.STRING,
  	email: {
  		type:Sequelize.STRING,
  		primaryKey:true
  	},
  	username: Sequelize.STRING,
  	password: Sequelize.STRING
})

//sequelize migration:create --name create_users_table
