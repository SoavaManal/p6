const passwordValid = require("password-validator");

// creer un schema de validation
const passwordSchema = new passwordValid();

passwordSchema
  .is()
  .min(8)
  .is()
  .max(50)
  .has()
  .uppercase(1)
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces();

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error: "Le mot de passe est faible !",
    });
  }
};
