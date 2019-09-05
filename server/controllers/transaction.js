"use strict";

var fs = require("fs");
var path = require("path");
var bcrypt = require("bcrypt-nodejs"); // Encriptar nuestra contraseña
var Transaction = require("../models/transaction");
var jwt = require("../services/jwt");
var md_auth = require("../middlewares/authenticated");

function save_transaction(req, res) {
  var transaction = new Transaction();

  var params = req.body;


  transaction.amount = params.amount;
  transaction.description = params.description;
  transaction.owner = md_auth.getUserReq(req).email
  transaction.createdAt = new Date()
  console.log(transaction)


  transaction.save((err) => {
    if (err)
      res.status(500).send({ message:  `Error al almacenar la transaccion: ${err}` });
    else
        res.status(200).send({ message: transaction });
  });
}

function update_transaction(req, res) {

  var transaction = req.body;

  transaction.updatedAt = new Date()

  console.log(transaction)

    Transaction.findByIdAndUpdate(req.params.id, transaction, (err, transactionUpdated) => {
      if (err) {
        res.status(500).send({ message: "Error al actualizar" });
      } else {
        if (!transactionUpdated) {
          res.status(404).send({ message: "No se ha podido actualizar" });
        } else {
          res.status(200).send({ transaction: transactionUpdated });
        }
      }
    });

}

function delete_transaction(req, res) {


    Transaction.findByIdAndRemove(req.params.id, (err) => {
      if (err)
        res.status(500).send({ message: "Error al eliminar" });
      res.status(200).send({ message: "okay" });

    });
}

function findAll_transactions(req, res) {
  var userId = req.params.id;

  var userEmail = md_auth.getUserReq(req).email

  Transaction.find({owner:userEmail},(err, transactions)=>{
    if (err) {
      res.status(500).send({ message: `Error al buscar transacciones por email:${userEmail}` });
    } else {
      if (!transactions) {
        res.status(404).send({ message: "No se ha podido encontrar transacciones" });
      } else {
        res.status(200).send({ transactions });
      }
    }
  });
}

module.exports = {
  save_transaction,
  update_transaction,
  delete_transaction,
  findAll_transactions
};
