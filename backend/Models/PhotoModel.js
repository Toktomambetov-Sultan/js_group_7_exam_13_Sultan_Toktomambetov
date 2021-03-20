const mongoose = require("mongoose");
const fs = require("fs").promises;
const config = require("../config");
const Schema = mongoose.Schema;

const Photo = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  image: {
    type: String,
    required: true,
  },
  cafe: {
    type: Schema.Types.ObjectId,
    ref: "Cafe",
    required: true,
  },
});
Photo.post("findOneAndDelete", async function (doc, next) {
  doc.image &&
    (await fs.unlink(
      config.ImageUploadingDir + "/" + doc.image
    ));
  next();
});
Photo.pre("save", async function (next, option) {
  await mongoose
    .model("CafeModel")
    .findByIdAndUpdate(this.cafe, {
      $inc: { totalPhotos: 1},
    });
  next();
});

module.exports = Photo;
