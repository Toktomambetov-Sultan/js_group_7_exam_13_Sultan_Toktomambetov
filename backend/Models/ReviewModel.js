const mongoose = require("mongoose");
const fs = require("fs").promises;
const config = require("../config");
const Schema = mongoose.Schema;

const rateOption = {
  type: Number,
  required: true,
};
const Review = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: [
      true,
      "Поле 'title' обязательна для заполнения",
    ],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  rates: {
    type: {
      "Quality of food": rateOption,
      "Service quality": rateOption,
      Interior: rateOption,
    },
    required: true,
  },
});

Review.post("findOneAndDelete", async function (doc, next) {
  next();
});

module.exports = Review;
