module.exports = async()=>{

	const Transaction = require("./models/transactionpg")
	const User = require("./models/userpg")

	User.hasMany(Transaction, {
		as:"Transaction",
		foreignKey: "userId"
	})
	
	Transaction.belongsTo(User, {
		as:"User", 
		foreignKey: "userId"
	})

	const errHandler = (err)=>{
		console.log("Error",err)
	}

	const user = await User.create({
		name:"adrian", 
		username:"itzumarpa", 
		email:"prendas.adrian@gmail.com",
		password:"1234"
	})
	.then()
	.catch(errHandler)

	const transaction = await Transaction.create({
		id:0,
		amount:550,
		description:"keller",
		userId:"prendas.adrian@gmail.com"
	})
	.then()
	.catch(errHandler)


	const users = await User.findAll({
		where: {username:"itzumarpa"},
		include: [{model:Transaction, as: "Transaction"}]
	})
	.catch(errHandler)


console.log("user:", users)

}