//app.js:gerrer tous les requette envoyer au serveur
const express = require("express");
const app = express();

const helmet = require("helmet");

const dotenv = require("dotenv");
dotenv.config(); //utiliser dotenv "acceder aux varriables d'environnement"

const mongoose = require("mongoose");

const userRouter = require("./routes/user");
const sauceRouter = require("./routes/sauce");
const likesRouter = require("./routes/likes");
const path = require("path");

//connecter application avec la base de donnée mongoDb
mongoose
  .connect(
    "mongodb+srv://manal:ilyan2020@cluster0.owdzz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//levée la securité de CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

//importer le package helmet
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

//accée au body.req:parse du contenue json(une autre methode:bodyparser.json)
app.use(express.json());

//servir le dossier static 'images'
//path un module pour interagir avec le systéme de fichier
//path.join renvoi un chemin normaliser en fusionnant deux chemin enssemble
//La string __dirname donne le chemin du répertoire du module courant
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRouter);
app.use("/api/sauces", sauceRouter);
app.use("/api/sauces", likesRouter);

module.exports = app;
