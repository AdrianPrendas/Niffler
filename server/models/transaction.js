"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TransactionSchema = Schema({
  amount: Number,
  description: String,
  createdAt: Date,
  updatedAt: Date,
  owner: String
},{
    versionKey: false
});

module.exports = mongoose.model("Transaction", TransactionSchema);
