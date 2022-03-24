//mongoose librairy de mongoDB (utile pour creer des shema )
const mongoose = require("mongoose");

//shema pour les sauces mise en application
const sauceSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },
    likes: { type: Number, default: 0, required: false },
    dislikes: { type: Number, default: 0, required: false },
    usersLiked: { type: [String], required: false },
    usersDisliked: { type: [String], required: false },
  },
  {
    versionKey: false,
  }
);

//exporter le models
module.exports = mongoose.model("Sauces", sauceSchema);
