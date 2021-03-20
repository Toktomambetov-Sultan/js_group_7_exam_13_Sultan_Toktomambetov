const {
  ValidationError,
  CastError,
} = require("mongoose").Error;

module.exports = (e, res, message="") => {
  switch (e.constructor) {
    case ValidationError:
      const errors = {};
      Object.keys(e.errors).forEach((key) => {
        errors[key] = e.errors[key].message;
      });
      return res.status(400).send({ errors });
    case CastError:
      return res.status(404).send({ error: message });
    default:
      console.log(e);
      return res
        .status(500)
        .send({ error: "Eternal Server Error" });
  }
};
