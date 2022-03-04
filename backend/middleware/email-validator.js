var validator = require("email-validator");

// true
module.exports = (req, res, next) => {
  if (validator.validate(req.body.email)) {
    next();
  } else {
    return res.status(400).json({
      error: "l'email n'est pas valide !",
    });
  }
};
