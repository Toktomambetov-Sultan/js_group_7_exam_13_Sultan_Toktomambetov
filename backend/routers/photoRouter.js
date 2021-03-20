const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const config = require("./../config");

const permit = require("../tools/routers/permitMiddleware");
const uploadImage = require("../tools/routers/uploadImg");
const authorizationMiddleware = require("../tools/routers/authorizationMiddleware");
const errorCatching = require("../tools/routers/errorCatching");

const schema = require("../Models");

router.get("/:id", async (req, res) => {
  try {
    const photos = await schema.Photo.find({
      cafe: req.params.id,
    }).populate("user", "displayName");
    res.send(photos);
  } catch (error) {
    res.status(400).send({
      message: "Wrong request.",
    });
  }
});

router.post(
  "/:id",
  [
    authorizationMiddleware(true),
    uploadImage.single("image"),
  ],
  async (req, res) => {
    try {
      const cafe = await schema.Cafe.findById(
        req.params.id
      );
      if (!cafe)
        return res.status(404).send({
          errors: { id: "Нет такого заведения." },
        });
      const photo = new schema.Photo({
        user: req.user._id,
        cafe: req.params.id,
      });
      photo.image = req.file && req.file.filename;
      await photo.save();
      res.send(photo);
    } catch (error) {
      req.file &&
        (await fs.unlink(
          config.ImageUploadingDir + "/" + req.file.filename
        ));
      return await errorCatching(error, res);
    }
  }
);

router.delete(
  "/:id",
  [authorizationMiddleware(true), permit("admin")],
  async (req, res) => {
    try {
      await schema.Photo.findOneAndDelete({
        _id: req.params.id,
      });
      res.send({ message: "successfully deleted" });
    } catch (error) {
      res.status(400).send({
        message: "Wrong request.",
        error,
      });
    }
  }
);

module.exports = router;
