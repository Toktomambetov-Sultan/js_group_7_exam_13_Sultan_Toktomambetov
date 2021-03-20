const express = require("express");
const router = express.Router();

const authorizationMiddleware = require("../tools/routers/authorizationMiddleware");
const errorCatching = require("../tools/routers/errorCatching");

const schema = require("../Models");

router.get("/:id", async (req, res) => {
  try {
    const review = await schema.Review.find({
      cafe: req.params.id,
    }).populate("user", "displayName");
    res.send(review);
  } catch (error) {
    return await errorCatching(error);
  }
});

router.post(
  "/:id",
  [authorizationMiddleware(true)],
  async (req, res) => {
    try {
      const cafe = await schema.Cafe.findById(
        req.params.id
      );
      if (!cafe)
        return res.status(404).send({
          errors: { id: "Нет такого заведения." },
        });
      const review = new schema.Review({
        user: req.user._id,
        cafe: req.params.id,
        rates: req.body.rates,
      });
      await review.save();
      res.send(review);
    } catch (error) {
      return await errorCatching(error, res);
    }
  }
);

module.exports = router;
