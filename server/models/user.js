"use strict";

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = Schema({
  name: String,
  email: {
    type:String,
    unique:true,
    index:true
  },
  username:  {
    type:String,
    unique:true
  },
  password: String
},{
    versionKey: false
});

module.exports = mongoose.model("User", UserSchema);
