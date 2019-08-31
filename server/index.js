"use strict";

//const sequelize = require("./connection")
const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;

/*
mongoose
.connect("mongodb://localhost:27017/niffler")
.then(() => {
console.log("La conexion a la base de datos se realizo correctamente...");
app.listen(port, () => {
console.log("El servidor local estan corriendo en localhost " + port);
});
})
.catch(err => console.log(err));
*/

const Sequelize = require("sequelize")
const { configure } = require('sequelize-pg-utilities')
const config = require('./config/config.json')
const { name, user, password, options } = configure(config)
global.sequelize = new Sequelize(name, user, password, options)
const {User, Transaction} = require("./models/relationships")



sequelize.authenticate().then(() => {
  console.log('The Postgres DB connection has been established successfully.');
  app.listen(port, () => {
    console.log("Server listening at localhost:" + port);


    User.findAll({
      where: {username:"itzumarpa"},
      include: [{model:Transaction, as: "Transaction"}]
    })
    .then(users=>console.log(JSON.stringify(users)))
    .catch(err=>console.log(err))
    

  });
}).catch(err => console.error('Unable to connect to the database:', err));
