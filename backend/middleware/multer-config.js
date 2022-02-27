const multer = require("multer");

//generer les extenssions du fichiers
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  //enregister les fichiers dans le dossier images
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //utiliser le nom d'origine, de remplacer les espaces par des underscores
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    //ajouter un timestamp pour rendre le filename unique
    callback(null, name + Date.now() + "." + extension);
  },
});

//single:fichier unique
module.exports = multer({ storage: storage }).single("image");
