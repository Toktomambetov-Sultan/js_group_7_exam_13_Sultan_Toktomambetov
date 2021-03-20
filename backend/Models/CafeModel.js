const mongoose = require("mongoose");
const unpublicUser = require("../tools/models/unpublicUser");
const fs = require("fs").promises;
const config = require("../config");
const Schema = mongoose.Schema;

const Cafe = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
Cafe.post("findOneAndDelete", async function (doc, next) {
  doc.image && (await fs.unlink(config.ImageUploadingDir + "/" + doc.image));
  next();
});


module.exports = Cafe;
