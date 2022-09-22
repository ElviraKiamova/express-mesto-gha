const User = require("../models/user")

module.exports.getUser = (req, res) => {
  Users.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.getUserId = (req, res) => {
  Users.findById(req.params.userId)
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  Users.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  Users.findByIdAndUpdate(req.user._id, { avatar })
    .then((user) => res.send({ data: user }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

// module.exports.getFilms = (req, res) => {
//     Film.find({})
//         .then(films => res.send({ data: films }))
//         .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// };

// module.exports.createFilm = (req, res) => {
//   const { title, genre } = req.body;

//   Film.create({ title, genre })
//     .then(film => res.send({ data: film }))
//     .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
// }

