/*
const {Client} = require("pg")

const client = new Client({
user: "itzumarpa",
password: "abcd",
host:"localhost",
port: 5432,
database: "niffler"
})


client.connect()
.then(()=>console.log("Connected successfuly"))
// .catch(err=> console.log(err))
.then(()=>client.end())

*/


const sequelize = require("./connection")
global.sequelize = sequelize;
const Transaction = require("./models/transactionpg")
const User = require("./models/userpg")

const errHandler = (err) =>{
	console.log("Error",err)
}


User.hasMany(Transaction, {
	as:"Transaction",
	foreignKey: "userId"
})

Transaction.belongsTo(User, {
	as:"User",
	foreignKey: "userId"
})


/*
Transaction.create({
	amount:550,
	description:"keller",
	userId:"prendas.adrian@gmail.com"
})
.then(t => console.log)
.catch(errHandler)
*/

User.findAll({
	where: {username:"itzumarpa"},
	include: [{model:Transaction, as: "Transaction"}]
})
.then(users=>console.log(JSON.stringify(users)))
.catch(errHandler)
