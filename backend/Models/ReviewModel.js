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
  cafe: {
    type: Schema.Types.ObjectId,
    ref: "Cafe",
    required: true,
  },
  text: {
    type: String,
    required: [
      true,
      "Поле 'text' обязательна для заполнения",
    ],
  },
  date: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  rates: {
    type: {
      total: rateOption,
      "Quality of food": rateOption,
      "Service quality": rateOption,
      Interior: rateOption,
    },
    required: true,
  },
});

Review.pre("save", async function (next, option) {
  const cafe = await mongoose
    .model("CafeModel")
    .findOne({ _id: this.cafe });
  const reviews = await mongoose
    .model("Review")
    .find({ cafe: this.cafe });
  this.rates.total =
    Object.values(this.rates).reduce(
      (acc, rate) => acc + rate,
      0
    ) / Object.keys(this.rates).length;
  const overall = {
    ...Object.keys(this.rates).reduce(
      (acc, key) => ({
        ...acc,
        [key]:
          [
            ...reviews.map((review) => review.rates[key]),
            this.rates[key],
          ].reduce((acc, rate) => acc + rate, 0) /
          (reviews.length + 1),
      }),
      {}
    ),
  };
  cafe.rates = overall;
  await cafe.save();
  next();
});

Review.post("findOneAndDelete", async function (doc, next) {
  next();
});

module.exports = Review;
