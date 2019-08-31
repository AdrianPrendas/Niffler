"use strict";

const User = require("./userpg")
const Transaction = require("./transactionpg")


User.hasMany(Transaction, {
	as:"Transaction",
	foreignKey: "userId"
})

Transaction.belongsTo(User, {
	as:"User",
	foreignKey: "userId"
})


module.exports = {
  User, Transaction
}
