const mongoose = require("mongoose");

const UserModel = require("./Models/UserModel");
const PhotoModel = require("./Models/CafeModel");

const User = mongoose.model("User", UserModel);
const Photo = mongoose.model("Photo", PhotoModel);

module.exports = {
  User,
  Photo,
};
