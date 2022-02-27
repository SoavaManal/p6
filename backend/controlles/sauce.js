const Sauce = require("../models/sauce");

//fs;permet l'accés au systéme des fichier
const fs = require("fs");
//CRUD

//POST: la création d'une Sauce
exports.createSauce = (req, res, next) => {
  const sauceObjet = JSON.parse(req.body.sauce);
  //suprimer le faux _id envoyer par le front-end
  delete sauceObjet._id;
  const sauce = new Sauce({
    //un raccourci pour copier les champs dans le corp de la requette et les detailés
    ...sauceObjet,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  //enregistrer l'objet dans la BD avec la fonction save()
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregister!" }))
    .catch((error) => res.status(400).json({ error }));
};

//PUT: la modifié une sauce
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  //la fonction updateOne (argument1:l'elements a modifié,argument2:elements qui remplace)
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Sauce modifiée!!" }))
    .catch((error) => res.status(400).json({ error }));
};

//DELETE:suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        res
          .status(404)
          .JSON({ error: new ERROR("il n'y a pas de sauce a suprimée!!") });
      }
      //   if (sauce.userId !== req.auth.userId) {
      //     res.status(403).json({
      //       error: new Error("requete non AUTORISEE!"),
      //     });
      //}
      else {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          sauce
            .deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: "Objet supprimé !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      }
    })
    .catch((error) => res.status(500).json({ error }));
};
//GET:affichage de tous les Sauces dans la BD
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(400).json({ error }));
};

//GET:affichage d'une seul sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};
