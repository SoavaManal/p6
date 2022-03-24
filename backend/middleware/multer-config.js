const multer = require("multer");

//generer les extenssions du fichiers
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
};
//diskStorage: configure le chemin et le nom du fichier
const storage = multer.diskStorage({
  //dans quelle dossier on va enregistrer nos images
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //avec quelle nom on va stocké nos images
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    //ajouter un timestamp pour rendre le filename unique
    callback(null, name + Date.now() + "." + extension);
  },
});

//single:fichier unique
module.exports = multer({ storage: storage }).single("image");
