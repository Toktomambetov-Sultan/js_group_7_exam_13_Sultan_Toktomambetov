const mongoose = require("mongoose");

const UserModel = require("./Models/UserModel");
const CafeModel = require("./Models/CafeModel");

const User = mongoose.model("User", UserModel);
const Cafe = mongoose.model("CafeModel", CafeModel);

module.exports = {
  User,
  Cafe,
};
