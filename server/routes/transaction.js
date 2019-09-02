"use strict";

var express = require("express");
var TransactionController = require("../controllers/transaction");

var api = express.Router();
var md_auth = require("../middlewares/authenticated");

var multipart = require("connect-multiparty");

api.post("/save-transaction", md_auth.ensureAuth, TransactionController.save_transaction);
api.put("/update-transaction/:id", md_auth.ensureAuth, TransactionController.update_transaction);
api.delete("/delete-transaction/:id",md_auth.ensureAuth, TransactionController.delete_transaction);
api.get("/find-all-transactions", md_auth.ensureAuth, TransactionController.findAll_transactions);

module.exports = api;
