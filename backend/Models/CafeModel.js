const mongoose = require("mongoose");
const fs = require("fs").promises;
const config = require("../config");
const Schema = mongoose.Schema;
const rateOption = {
  type: Number,
  required: true,
  default: 0,
};
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
  totalReviews: {
    type: Number,
    required: true,
    default: 0,
  },
  rates: {
    type: {
      "Quality of food": rateOption,
      "Service quality": rateOption,
      Interior: rateOption,
      total: rateOption,
    },
    default: {
      "Quality of food": 0,
      "Service quality": 0,
      Interior: 0,
      total: 0,
    },
    required: true,
  },
});

Cafe.post("findOneAndDelete", async function (doc, next) {
  doc.image &&
    (await fs.unlink(
      config.ImageUploadingDir + "/" + doc.image
    ));
  const photos = await mongoose
    .model("Photo")
    .find({ cafe: doc._id });
  await mongoose
    .model("Review")
    .deleteMany({ cafe: doc._id });
  for (let doc of photos) {
    doc.image &&
      (await fs.unlink(
        config.ImageUploadingDir + "/" + doc.image
      ));
  }
  await mongoose
    .model("Photo")
    .deleteMany({ cafe: doc._id });

  next();
});

module.exports = Cafe;
