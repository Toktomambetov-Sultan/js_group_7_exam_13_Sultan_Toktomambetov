const express = require("express");
const router = express.Router();

const permit = require("../tools/routers/permitMiddleware");
const authorizationMiddleware = require("../tools/routers/authorizationMiddleware");
const errorCatching = require("../tools/routers/errorCatching");

const schema = require("../Models");

router.get("/:id", async (req, res) => {
  try {
    const review = await schema.Review.find({
      cafe: req.params.id,
    })
      .sort({ date: -1 })
      .populate("user", "displayName");
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
        text: req.body.text,
      });
      await review.save();
      res.send(review);
    } catch (error) {
      return await errorCatching(error, res);
    }
  }
);
router.delete(
  "/:id",
  [authorizationMiddleware(true), permit("admin")],
  async (req, res) => {
    try {
      await schema.Review.findOneAndDelete({
        _id: req.params.id,
      });
      return res.send({
        message: "Отзыв успешно удален.",
      });
    } catch (e) {
      return await errorCatching(e, res);
    }
  }
);
module.exports = router;
