const mongoose = require("mongoose");
const fs = require("fs").promises;
const config = require("../config");
const Schema = mongoose.Schema;

const Cafe = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
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
  totalPhotos: {
    type: Number,
    required: true,
    default: 0,
  },
  rates: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      rate: {
        type: Number,
        required: true,
      },
    },
  ],
  totalReviews: {
    type: Number,
    required: true,
    default: 0,
  },
});

Cafe.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.totalRate =
      ret.rates.reduce((acc, { rate }) => +rate + acc, 0) /
      ret.rates.length;
    return ret;
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
