const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/user");
const sauceRouter = require("./routes/sauce");
const likesRouter = require("./routes/likes");
const path = require("path");

const app = express();
mongoose
  .connect(
    "mongodb+srv://manal:ilyan2020@cluster0.owdzz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

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

//accer au body.req:parse du contenue json(une autre methode:bodyparser.json)
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/auth", userRouter);
app.use("/api/sauces", sauceRouter);
app.use("/api/sauces", likesRouter);

module.exports = app;
