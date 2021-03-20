const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const config = require("./../config");
const uploadImage = require("../tools/routers/uploadImg");
const authorizationMiddleware = require("../tools/routers/authorizationMiddleware");
const errorCatching = require("../tools/routers/errorCatching");

const schema = require("../Models");

router.get("/", async (req, res) => {
  try {
    const cafe = await schema.Cafe.find().populate(
      "user",
      "displayName"
    );
    return res.send(cafe);
  } catch (error) {
    return await errorCatching(e, res);
  }
});

router.post(
  "/",
  uploadImage.single("image"),
  [authorizationMiddleware(true)],
  async (req, res, next) => {
    try {
      if (req.body.checkbox === "true") {
        const cafe = new schema.Cafe({
          title: req.body.title,
          user: req.user._id,
          description: req.body.description,
        });
        if (req.file) cafe.image = req.file?.filename;
        await cafe.save();
        return res.send({
          message: "Заведение успешно зарегистрированно",
        });
      } else {
        return res.status(400).send({
          errors: { checkbox: "Поставьте галочку" },
        });
      }
    } catch (e) {
      req.file &&
        (await fs.unlink(
          config.ImageUploadingDir + "/" + req.file.filename
        ));
      return await errorCatching(e, res);
    }
  }
);

router.put(
  "/put-rate/:id",
  authorizationMiddleware(true),
  async (req, res) => {
    try {
      const cafe = await schema.Cafe.findById(
        req.params.id
      );
      const rate_id = cafe.rates.findIndex(
        (rate) =>
          rate.user.toString() === req.user._id.toString()
      );
      rate_id + 1
        ? (cafe.rates[rate_id].rate = req.body.rate)
        : cafe.rates.push({
            user: req.user._id,
            rate: req.body.rate,
          });
      await cafe.save();
      res.send({ message: "Заведение успешно оцененно" });
    } catch (e) {
      return await errorCatching(e, res);
    }
  }
);
module.exports = router;
