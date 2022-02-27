const Sauce = require("../models/sauce");

exports.creatLikes = (req, res, next) => {
  const like = req.body.likes;
  const userId = req.body.userId;
  //la sauce selectionner
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      //verrifier si l'utilisateur a deja liké ou disliké
      let userLike = sauce.usersLiked.find((id) => id === userId);
      let userDislike = sauce.usersDisliked.find((id) => id === userId);
      switch (like) {
        // utilasateur like
        case 1:
          if (!userLike) {
            //si le userId n'existe pas encore dans usersLiked
            sauce.likes += 1;
            sauce.userLiked.push(userId);
          } else {
            throw new Error("un seul like!!");
          }
          if (userDislike) {
            //si le userId se trouve dans le usersDisliked
            throw new Error("dabord enlever le deslike!!");
          }
          break;
        case 0: //utilisateur retir son like ou son dislike
          if (userLike) {
            //si l'utilisateur like déja
            sauce.likes -= 1;
            sauce.usersLiked.filter((id) => id !== userId); //retir son userId du usersLiked
          } else if (userDislike) {
            //si l'utilisateur dislike déja
            sauce.dislikes -= 1;
            sauce.usersDisliked.filter((id) => id !== userId); //retir son dislike du usersDisliked
          }
          break;
        case -1: //utilisateur dislike
          if (!userDislike) {
            //si son userId n'existe pas dans le usersdisliked
            sauce.dislikes += 1;
            sauce.usersDisliked.puch(userId); //ajouter son userId
          } else {
            throw new Error("un seul like!!");
          }
          if (userLike) {
            throw new Error("dabord enlevé le like");
          }
      }
      sauce
        .save()
        .then(() => res.status(201).json({ message: "choix enregistré!" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
