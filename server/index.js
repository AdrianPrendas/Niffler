"use strict";

const mongoose = require("mongoose");
const app = require("./app");
const port = process.env.PORT || 8080;

mongoose.Promise = global.Promise;


mongoose
.connect("mongodb://localhost:27017/niffler")
.then(() => {
console.log("La conexion a la base de datos se realizo correctamente...");
app.listen(port, () => {
console.log("El servidor local estan corriendo en localhost " + port);
});
})
.catch(err => console.log(err));
