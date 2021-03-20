const mongoose = require("mongoose");
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
    required: [
      true,
      "Поле 'title' обязательна для заполнения",
    ],
  },
  description: {
    type: String,
    required: [
      true,
      "Поле 'description' обязательна для заполнения",
    ],
  },
  image: {
    type: String,
    required: true,
  },
  totalPhoto: {
    type: Number,
    required: true,
    default: 0,
  },
  rate: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: {
    type: Number,
    required: true,
    default: 0,
  },
});

Cafe.post("findOneAndDelete", async function (doc, next) {
  doc.image &&
    (await fs.unlink(
      config.ImageUploadingDir + "/" + doc.image
    ));
  next();
});

module.exports = Cafe;
