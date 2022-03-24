const Sauce = require("../models/sauce");

//fs:permet l'accés au systéme des fichier
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
  if (req.file) {
    // Récupération de la sauce dans la base de données
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        // Récupération du nom de la photo à supprimer dans la base de données
        const filename = sauce.imageUrl.split("/images")[1];
        // Suppression de l'image dans le dossier 'images' du serveur
        fs.unlink(`images/${filename}`, function (error) {
          if (error) {
            throw error;
          }
        });
      })
      .catch((error) => {
        res.status(400).json({ error });
      });
  }
  // 2 cas possibles : si il y a un nouveau fichier pour la photo ou si la photo n'est pas modifiée
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  // Mise à jour de la base de données
  // Sauce.updateOne() permet de modifier un objet
  // Argument 1 : Objet de comparaison '_id' doit être le même que le paramètre de requête
  // Argument 2 : nouvel objet
  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => {
      res
        .status(201)
        .json({ message: "Sauce modifiée !", contenu: sauceObject });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

//DELETE:suppression d'une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      // Récupération de la sauce dans la base de données
      if (!sauce) {
        return res.status(404).json({
          error: new Error("Sauce non trouvée !"),
        });
      }
      // Vérification que la sauce appartient à la personne qui effectue la requête
      if (sauce.userId !== req.auth.userId) {
        return res.status(401).json({ message: "Unauthorized request" });
      }
      //nom du fichier à supprimer
      const filename = sauce.imageUrl.split("/images")[1];
      fs.unlink(`images/${filename}`, () => {
        // Suppression de la sauce dans la base de données
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => {
            res.status(201).json({ message: "Sauce supprimée !" });
          })
          .catch((error) => {
            res.status(400).json({ error });
          });
      });

      // else {
      //   throw error;
      // }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
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
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};
