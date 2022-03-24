//verrifier le token frontend et permettre uniquement a des requete authentifier de reussire

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //le token est envoyé par le front-end avec l'en-tête d’autorisation : « Bearer <token>
    //recuperer le deuxieme element du tableau (bearer token)
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;
    req.auth = { userId };
    if (req.body.userId && req.body.userId !== userId) {
      throw "Invalid user ID";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
