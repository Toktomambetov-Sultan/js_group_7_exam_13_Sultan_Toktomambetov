const schema = require("../Models");
const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("../config");
const fs = require("fs").promises;

mongoose.connect(config.db.url + config.db.name, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  autoIndex: true,
});
const db = mongoose.connection;

db.once("open", async () => {
  await Promise.all(
    (await fs.readdir(config.ImageUploadingDir)).map(
      (item) => {
        if (item === ".gitignore") return;
        fs.unlink(config.ImageUploadingDir + "/" + item);
      }
    )
  );
  await Promise.all(
    (
      await fs.readdir(config.FixturesImagesDir)
    ).map((item) =>
      fs.copyFile(
        `${config.FixturesImagesDir}/${item}`,
        `${config.ImageUploadingDir}/${item}`
      )
    )
  );
  try {
    await db.dropDatabase();
  } catch (e) {
    console.log(
      "Collections were not present, skipping drop..."
    );
  }
  const [user, moder] = await schema.User.create(
    {
      username: "User",
      password: "H1h2h3h4",
      displayName: "User",
      email: "ww.rr@dd.x",
      token: nanoid(),
    },
    {
      username: "Admin",
      password: "H1h2h3h4",
      email: "ww.rr@dd.r",
      displayName: "Admin",
      role: "admin",
      token: nanoid(),
    }
  );
  const cafe = await schema.Cafe.create(
    {
      user: user._id,
      title: "title",
      description: "description",
      image: "1.jpeg",
    }
  );
  const photo = await schema.Photo.create({
    user: user._id,
    image: "2.jpeg",
    cafe: cafe._id,
  });
  const [review] = await schema.Review.create(
    {
      rates: {
        "Quality of food": 0.4,
        "Service quality": 0.2,
        Interior: 0.6,
      },
      user: user._id,
      text: "review",
      cafe: cafe._id,
    },
    {
      rates: {
        "Quality of food": 0.4,
        "Service quality": 0.2,
        Interior: 0.6,
      },
      user: user._id,
      text: "review",
      cafe: cafe._id,
    },
    {
      rates: {
        "Quality of food": 0.4,
        "Service quality": 0.2,
        Interior: 0.6,
      },
      user: user._id,
      text: "review",
      cafe: cafe._id,
    }
  );

  console.log(`User: ${user.token}`);
  console.log(`Moder: ${moder.token}`);
  db.close();
});
