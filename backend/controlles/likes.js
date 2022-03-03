const Sauce = require("../models/sauce");

exports.likeOrDislike = function (req, res, next) {
  let like = req.body.like;
  let userId = req.body.userId;
  Sauce.findOne({ _id: req.params.id })
    //trouver la sauce
    .then((sauce) => {
      switch (like) {
        case 1: //like=1
          //si le id_utilisateur n'est pas encore dans le usersLiked l'utilisateur peut liké
          //les likes incrémente de 1 et le userId se rajoute au tableau usersLiked
          if (!sauce.usersLiked.includes(userId) && like === 1) {
            Sauce.updateOne(
              { _id: req.params.id },
              { $inc: { likes: 1 }, $push: { usersLiked: userId } }
            )
              .then(() => {
                res.status(201).json({ message: "La sauce a été likée !" });
              })
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        // Like = -1 => L'utilisateur n'aime pas la sauce (dislike = +1)
        case -1: //dislike=1
          //si le id_utilisateur n'est pas encore dans le usersDisliked l'utilisateur peut disliké
          //le dilike incrémente de 1 et le userId se rajoute au tableau usersDisliked
          if (!sauce.usersDisliked.includes(userId) && like === -1) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: 1 },
                $push: { usersDisliked: userId },
              }
            )
              .then(() =>
                res.status(201).json({ message: "La sauce a été dislikée !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;

        case 0: //like=0 ou dislike=0
          //si utilisateur like il peut retirer son like
          //les likes décremente de 1 et le userId sera supprimé du tableau usersLiked
          if (sauce.usersLiked.includes(userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { likes: -1 },
                $pull: { usersLiked: userId },
              }
            )
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Le like de la sauce a été annulé !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          //si utilisateur dislike il peut retirer son dislike
          //les dislikes décremente de 1 et le userId sera supprimé du tableau usersLiked
          if (sauce.usersDisliked.includes(userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $inc: { dislikes: -1 },
                $pull: { usersDisliked: userId },
              }
            )
              .then(() =>
                res
                  .status(201)
                  .json({ message: "Le dislike de la sauce a été annulé !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
          break;
      }
    })
    .catch((error) => res.status(404).json({ error }));
};
