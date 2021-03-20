const express = require("express");
const router = express.Router();
const fs = require("fs").promises;

const uploadImage = require("../tools/routers/uploadImg");
const authorizationMiddleware = require("../tools/routers/authorizationMiddleware");
const errorCatching = require("../tools/routers/errorCatching");

const schema = require("../Models");

router.get("/", async (req, res) => {
  try {
    const cafe = await schema.Cafe.find(
      req.query.id
        ? {
            user: req.query.id,
          }
        : {}
    ).populate("user", "username");
    let user = null;
    res.send({ cafe, user });
  } catch (error) {
    return await errorCatching(e, res);
  }
});

router.post(
  "/",
  [
    authorizationMiddleware(true),
    uploadImage.single("image"),
  ],
  async (req, res) => {
    try {
      if (req.body.checkbox) {
        const cafe = new schema.Photo({
          title: req.body.title,
          user: req.user._id,
          description: req.body.description,
          image: req.file && req.file.filename,
        });
        await cafe.save();
        return res.send({
          message: "Заведение успешно зарегистрированно",
        });
      } else {
        return res.send({
          erorrs: { checkbox: "Поставьте галочку" },
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

module.exports = router;
