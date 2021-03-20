const mongoose = require("mongoose");

const UserModel = require("./Models/UserModel");
const CafeModel = require("./Models/CafeModel");
const PhotoModel = require("./Models/PhotoModel");

const User = mongoose.model("User", UserModel);
const Cafe = mongoose.model("CafeModel", CafeModel);
const Photo = mongoose.model("Photo", PhotoModel);

module.exports = {
  User,
  Cafe,
  Photo,
};
